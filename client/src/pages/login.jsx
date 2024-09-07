import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { div } from 'three/webgpu';
import '../style/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='custom-login-form'>
    <div className='custom-box' >
    
    <div className='login-form'>
    <h3 className='mb-3'>Login</h3>
    <form>
  <div class="form-outline mb-4">
    <input type="email" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">Email address</label>
  </div>

  <div class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Password</label>
  </div>

  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

    <div class="col text-end">
      <a href="#!">Forgot password?</a>
    </div>
  </div>

  <button type="submit" class="btn btn-primary btn-block mb-4 w-100">
    Sign in
  </button>

  <div class="text-center">
    <p>Not a member?</p> <Link to="/register">Register</Link>

  </div>
</form>

    </div>

    </div>
    </div>
  )
};

export default Login;

