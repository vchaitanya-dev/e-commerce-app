import "./signup.scss";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import {Link} from "react-router-dom";
import hidPassword from '../../assets/images/hidPassword.png';
import unhidPassword from '../../assets/images/unhidPassword.png';
interface UseFormInput {
  name: string;
  email: string;
  password: string;
}
function Signup() {
  const [showPassword,setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate();
  const [data, setData] = useState<UseFormInput>({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = data;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(function (prevForm) {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (auth.currentUser !== null) {
        updateProfile(auth.currentUser, { displayName: name });
      }
      const timestamp = serverTimestamp();
      const formCopy = { email, name, timestamp };
      await setDoc(doc(db, "users", user.uid), formCopy);
      navigate("/");
    } catch (error) {
      toast.error("Somehting went wrong with registration");
    }
  };
  return (

 
      <div className="card">
        <div className="signup-card">
          <h2>Sign Up</h2>
          <form action="">
           <div className="form-group">
           <div className="name-group">
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
                 placeholder="Enter your full name"
              />
            </div>
            <div className="email-group">
              <label htmlFor="">Email</label>
              <input
                type="Email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </div>
           </div>
            <div className="password-group">
              <label htmlFor="">Password</label>
              <div className="show">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                   placeholder="Enter your password"
                />
               <img src={showPassword ? (hidPassword) : (unhidPassword)} alt="" onClick={() => setShowPassword(!showPassword)}/>
              </div>
            <p>Password should contains one small letter, one Capital letter, and number only</p>
            </div>
          </form>
          <button onClick={handleSubmit}>Sign Up</button>
      <div className="signInSection">
      <h3>OR</h3>
      <div className="signIn">
      <h4>Already a user ? </h4>
      <Link to="/signin" className="signup" >Sign In</Link>
      </div>
      </div>
        </div>
      </div>
  
  );
}

export default Signup;
