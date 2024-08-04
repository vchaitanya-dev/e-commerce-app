import { Link } from "react-router-dom"
import "./header.scss";
import { useState } from "react";
import cart from '../../assets/images/cart.png';
import menubar from '../../assets/images/menubar.png'
import close from "../../assets/images/close.svg";
import {getAuth} from 'firebase/auth'

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const auth = getAuth();
  return (
    <nav>
      <div className="left">
        <Link to="/" className="home_link">
        Le Joyau Précieux
        </Link>
      </div>
      <div className="right">
     <div className="cart">
    
     <Link to="/cart" className="cart_link">
      
      <img src={cart} alt="cart-icon" />
      
      </Link>
      <p>3</p>
     </div>
      <img src={menubar} alt="menu-bar"  className="menu_bar" onClick={()=>setOpen(true)}/>
      <div className={open !== false ? "menu active" : "menu "}>
      <img src={close} alt="close-icon" className="closeicon"  onClick={()=>setOpen(false)}/>
        <div className="menulinks">
    <Link className="menulink" to="/">Home</Link>
    <Link className="menulink" to="/about">About</Link>
    <Link className="menulink" to="/shop">Shop</Link>
    {
      auth.currentUser?.displayName !== undefined ? 
    
      <button>Sign Out</button>
    
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
  )
}

export default Header