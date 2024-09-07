import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { div } from 'three/webgpu';
import '../style/login.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='custom-login-form'>
    <div className='custom-box'>

        <form>
      {/* Name input */}
      <h3 className='mb-3'>Register</h3>
      <div className="form-outline mb-4">
        <input
          type="text"
          id="formName"
          className="form-control"
          placeholder="Enter your name"
        />
      </div>

      {/* Email input */}
      <div className="form-outline mb-4">
        <input
          type="email"
          id="formEmail"
          className="form-control"
          placeholder="Enter your email"
        />
      </div>

      {/* Password input */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="formPassword"
          className="form-control"
          placeholder="Enter password"
        />
      </div>

      {/* Confirm Password input */}
      <div className="form-outline mb-4">
        {/* <label className="form-label" htmlFor="formConfirmPassword">
          Confirm Password
        </label> */}
        <input
          type="password"
          id="formConfirmPassword"
          className="form-control"
          placeholder="Confirm your password"
        />
      </div>

      {/* Checkbox */}
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="formAgreement"
        />
        <label className="form-check-label" htmlFor="formAgreement">
          I agree to the terms and conditions
        </label>
      </div>

      {/* Submit button */}
      <button className="btn btn-primary btn-block w-100 mb-4">
          Register
      </button>

      {/* Login link */}
      <div className="text-center">
        <p>Already have an account? </p> <Link to="/login">Login</Link> 
      </div>
    </form>
    </div>
    </div>
  );
}

export default Signup;