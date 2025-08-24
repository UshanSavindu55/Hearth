// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


export const validateUsername = (username) => {
  if (!username || !username.trim()) {
    return 'Username is required'
  }
  if (username.trim().length < 3) {
    return 'Username must be at least 3 characters'
  }
  return null
}


export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required'
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address'
  }
  return null
}


export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return null
}


export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return 'Please confirm your password'
  }
  if (confirmPassword !== password) {
    return 'Passwords do not match'
  }
  return null
}


export const validateLoginForm = (formData) => {
  const errors = {}

  const emailError = validateEmail(formData.email)
  if (emailError) {
    errors.email = emailError
  }

  if (!formData.password) {
    errors.password = 'Password is required'
  }

  return errors
}


export const validateSignupForm = (formData) => {
  const errors = {}

  const usernameError = validateUsername(formData.username)
  if (usernameError) {
    errors.username = usernameError
  }

  const emailError = validateEmail(formData.email)
  if (emailError) {
    errors.email = emailError
  }

  const passwordError = validatePassword(formData.password)
  if (passwordError) {
    errors.password = passwordError
  }

  const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password)
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError
  }

  return errors
}


export const hasValidationErrors = (errors) => {
  return Object.keys(errors).length > 0
}
