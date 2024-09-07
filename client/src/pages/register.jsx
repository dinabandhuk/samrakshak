import '../styles/login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAxios from '../utils/useAxios';

const Register = () => {

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const axios = useAxios()

  const handleOnRegister = async (e) => {
    try {
      e.preventDefault();
      console.log(userName, email, password, role)
      const response = await axios.post("/register", { userName, email, password, role })
      
    } catch (error) {
      console.log(error)
    }
  }

  return (


    <div className='custom-login-form'>
      <div className='custom-box'>

        {/* Name input */}
        <h3 className='mb-3'>Register</h3>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="formName"
            className="form-control"
            placeholder="Enter your name"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>

        {/* Email input */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="formEmail"
            className="form-control"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        {/* Password input */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="formPassword"
            className="form-control"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="form-outline mb-4">
          <select className="form-select" aria-label="Default select example" onChange={(event) => { setRole(event.target.value) }}>
            <option value="viewer">Select Role</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
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
        <button className="btn btn-primary btn-block w-100 mb-4" onClick={handleOnRegister}>
          Register
        </button>

        {/* Login link */}
        <div className="text-center">
          <p>Already have an account? </p> <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
