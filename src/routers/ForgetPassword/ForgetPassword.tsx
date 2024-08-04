import { useState } from 'react';
import "./forgetpassword.scss";
import {getAuth,sendPasswordResetEmail} from 'firebase/auth';
import {toast } from 'react-toastify';
function ForgetPassword() {
  const [email,setEmail] = useState<string>("")

const onSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
try{
  const auth = getAuth();
  await sendPasswordResetEmail(auth,email)
  toast.success("Email was sent")
}
catch(error){
  toast.error('Could not send reset email')
}
}
  return (
 <>
 <div className="card">
        <div className="forgetpassword-card">
          <h2>Sign In</h2>
          <form action="">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="Email"
                name="email"
                id="email"
                value={email}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) }
              />
            </div>
            <button onClick={onSubmit}>Forget password</button>
          </form>
        </div>
      </div>
 </>
  )
}

export default ForgetPassword