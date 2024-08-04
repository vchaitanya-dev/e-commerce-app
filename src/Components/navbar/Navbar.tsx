import { Link } from "react-router-dom"
import "./navbar.scss";
import { useState } from "react";
import cart from '../../assets/images/cart.png';
import menubar from '../../assets/images/menubar.png';
import close from "../../assets/images/close.svg";
import {getAuth} from 'firebase/auth'
import {toast,ToastContainer} from 'react-toastify'
const Header = () => {
  const auth = getAuth();
  const [open, setOpen] = useState<boolean>(false);
  const handleSignout = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      auth.signOut();
      toast.success("You have sucessfull logged Out")
    }catch(error){
      toast.error("There is something wrong")
    }
  }
  return (
<>
<ToastContainer/>
<nav className="navcontainer">
      <div className="left">
        <Link to="/" className="home_link">
        Le Joyau Précieux
        </Link>
      </div>
      <div className="right">
      <Link to="/cart" className="cart_link">
      <img src={cart} alt="cart-icon" />
      </Link>
      <img src={menubar} alt="menu-bar" onClick={()=>setOpen(true)} className="menu_bar"/>
      <div className={open !== false ? "menu active" : "menu "}>
      <img src={close} alt="close-icon" className="closeicon" onClick={()=>setOpen(false)}/>
        <div className="menulinks">
    <Link className="menulink" to="/">Home</Link>
    <Link className="menulink" to="/about">About</Link>
    <Link className="menulink" to="/shop">Shop</Link>
    {
      auth.currentUser?.displayName !== undefined ? 
    
      <button onClick={handleSignout}>Sign Out</button>
    
      : (
<>
<Link className="menulink" to="/signin">SignIn</Link>
<Link className="menulink" to="/signup">SignUp</Link>
</>
      )
    }
        </div>
        </div>
      </div>
    </nav>
</>
  )
}

export default Header