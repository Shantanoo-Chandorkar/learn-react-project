import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./styles/ReactForm.css"

const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const ReactForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Sanitize input
    const sanitizedData = {};
    for (let key in data) {
      sanitizedData[key] = sanitizeInput(data[key]);
    }

    // Simulate secure submissions
    setSubmittedData(sanitizedData);
    reset();
  }

  return (
    <div className="react-form-container">
      <h2>{isLogin ? 'Login' : 'Register'} Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* {Email Field} */}
        <div className="react-form-group">
          <label>Email</label>

          <input
            type="email"
            {
            ...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
              maxLength: {
                value: "100",
                message: "Too Long",
              },
            })
            }
          />
          {errors.email && <p className="react-form-error">{errors.email.message}</p>}
        </div>


        {/* Password Field */}
        <div className="react-form-group">
          <label>Password</label>
          <div className="react-form-password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' },
                maxLength: { value: 100, message: 'Too long' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message: 'Must contain upper, lower, digit, special char',
                },
              })}
            />
            <button
              type="button"
              className="react-form-show-button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p className="react-form-error">{errors.password.message}</p>}
          <small className="react-form-note">
            Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.
          </small>
        </div>

        {/* Confirm Password Field (Registration Only) */}
        {!isLogin && (
          <div className="react-form-group">
            <label>Confirm Password</label>
            <div className="react-form-password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : "password"}
                autoComplete="off"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
              />
              <button type="button" className="react-form-show-button" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="react-form-error">{errors.confirmPassword.message}</p>
            )}
          </div>
        )}

        {/* Name Field for Registration */}
        {!isLogin && (
          <div className="react-form-group">
            <label>Full Name</label>
            <input
              type="text"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: { value: 3, message: 'Too short' },
                maxLength: { value: 50, message: 'Too long' },
                pattern: {
                  value: /^[a-zA-Z\s'.-]+$/,
                  message: 'Only letters, spaces, dots, hyphens allowed',
                },
              })}
            />
            {errors.fullName && <p className="react-form-error">{errors.fullName.message}</p>}
          </div>
        )}

        <button type="submit" className="react-form-submit">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="react-form-toggle">
        {isLogin ? (
          <>
            Don’t have an account?{' '}
            <button onClick={() => setIsLogin(false)}>Sign up</button>
          </>
        ) : (
          <>
            Have an account?{' '}
            <button onClick={() => setIsLogin(true)}>Log in</button>
          </>
        )}
      </div>

      {submittedData && (
        <div className="react-form-result">
          <strong>Sanitized Submission Result:</strong>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default ReactForm;