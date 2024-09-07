import "../styles/login.css"
import { Link } from 'react-router-dom';
import useAxios from "../utils/useAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const axios = useAxios();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleOnLogin = async () => {
    try {
      const response = await axios.post("/login", { email, password })
      localStorage.setItem("token", response.data.token)
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='custom-login-form'>
      <div className='custom-box' >

        <div className='login-form'>
          <h3 className='mb-3'>Login</h3>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">Email address</label>
            <input type="email" id="form2Example1" className="form-control" onChange={(event) => setEmail(event.target.value)} />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">Password</label>
            <input type="password" id="form2Example2" className="form-control" onChange={(event) => setPassword(event.target.value)} />
          </div>

          <button className="btn btn-primary btn-block mb-4 w-100" onClick={handleOnLogin}>
            Login
          </button>

          <div className="text-center">
            <p>Not a member?</p> <Link to="/register">Register</Link>

          </div>

        </div>

      </div>
    </div>
  )
};

export default Login;

