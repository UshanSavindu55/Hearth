# Build stage
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copy Maven files and source code
COPY pom.xml .
COPY src ./src

# Build the app (adjust if using Gradle)
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the app listens on
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
