import "./signin.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import {Link} from 'react-router-dom';
import hidPassword from '../../assets/images/hidPassword.png';
import unhidPassword from '../../assets/images/unhidPassword.png';
interface UseFormInput {
  email: string;
  password: string;
}
function Signin() {
  const [showPassword,setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate();
  const [data, setData] = useState<UseFormInput>({
    email: "",
    password: "",
  });

  const { email, password } = data;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(function (prev) {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };
  return (
    <>
      <div className="card">
        <div className="signin-card">
          <h2>Sign In</h2>
          <form action="">
            <div className="email-group">
              <label htmlFor="">Email</label>
              <input
                type="Email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="password-group">
              <label htmlFor="">Password</label>
              <div className="show">
                <input
                  type={showPassword ? "text" : "password" }
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                />
                <img src={showPassword ? (hidPassword) : (unhidPassword)} alt="" onClick={() => setShowPassword(!showPassword)}/>
              </div>
          <Link to="/forgetpassword" className="forgot" >Forgot Password</Link>
            </div>
            <button onClick={handleSubmit}>Signin</button>
          </form>
    <div className="newUserSection">
    <h3>OR</h3>
        <div className="signupsection">
        <h4>Are you new user ?</h4>
          <Link to="/signup" className="signup" >SignUp</Link>
        </div>
    </div>
        </div>
      </div>
      </>
    );
}

export default Signin;
