package com.hearth.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hearth.backend.exception.ErrorResponse;
import com.hearth.backend.exception.InvalidJwtAuthenticationException;
import com.hearth.backend.exception.JwtTokenMissingException;
import com.hearth.backend.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;


    private boolean isPublicEndpoint(String path) {
        return path.startsWith("/api/auth") || path.equals("/") || path.equals("/error");
    }

    //Method to convert the exceptions which occurs inside the filter to my custom error response structure
    private void sendErrorResponse(HttpServletResponse response, String field, String message, int statusCode) throws IOException {
        ErrorResponse error = new ErrorResponse(field, message, statusCode);

        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(objectMapper.writeValueAsString(error));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        if (isPublicEndpoint(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        String token = null;
        String username = null;

        try {
            if (header == null || !header.startsWith("Bearer ")) {
                throw new JwtTokenMissingException("JWT token is missing or malformed");
            }

            token = header.substring(7);
            username = jwtService.getUsernameFromToken(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService.loadUserByUsername(username);
                jwtService.validateTokenOrThrow(token);

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

            filterChain.doFilter(request, response);

        } catch (JwtTokenMissingException e) {
            sendErrorResponse(response, "Authorization", "JWT token is missing or malformed", HttpServletResponse.SC_UNAUTHORIZED);
        } catch (InvalidJwtAuthenticationException e) {
            sendErrorResponse(response, "Authorization", "Invalid or expired JWT token", HttpServletResponse.SC_UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
            sendErrorResponse(response, "error", "Unexpected authentication error", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}

