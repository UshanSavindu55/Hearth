import { useState, useCallback } from 'react'

// Custom hook for form management
export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }, [errors])

  // Handle input blur (mark as touched)
  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    // Validate field on blur if validation rules exist
    if (validationRules[name]) {
      validateField(name, values[name])
    }
  }, [values, validationRules])

  // Validate single field
  const validateField = (name, value) => {
    const rules = validationRules[name]
    if (!rules) return true

    let error = ''

    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      error = rules.required
    }
    // Min length validation
    else if (rules.minLength && value.length < rules.minLength.value) {
      error = rules.minLength.message
    }
    // Email validation
    else if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = rules.email
    }
    // Custom validation
    else if (rules.custom && !rules.custom.test(value)) {
      error = rules.custom.message
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }))

    return !error
  }

  // Validate all fields
  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach(name => {
      const fieldValid = validateField(name, values[name])
      if (!fieldValid) {
        isValid = false
      }
    })

    return isValid
  }

  // Handle form submission
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {})
      setTouched(allTouched)

      // Validate form
      if (validateForm()) {
        try {
          await onSubmit(values)
        } catch (error) {
          console.error('Form submission error:', error)
        }
      }

      setIsSubmitting(false)
    }
  }, [values, validateForm])

  // Reset form
  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  // Set specific field value
  const setValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    reset,
    validateForm,
    hasErrors: Object.values(errors).some(error => error !== '')
  }
}

export default useForm
