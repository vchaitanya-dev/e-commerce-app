import { RouterProvider,createBrowserRouter } from "react-router-dom";
import Signin from "./routers/Signin/Signin";
import Signup from "./routers/Signup/Signup";
import Home from "./routers/Home/Home";
import Shop from "./routers/Shop/Shop";
import Product from "./routers/Product/Product";
import Cart from  "./routers/Cart/Cart";
import About from "./routers/About/About";
import ForgetPassword from "./routers/ForgetPassword/ForgetPassword"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/signin',
      element:<Signin />
    },
    {
      path:'/signup',
      element:<Signup />
    },
    {
      path:'/shop',
      element:<Shop />
    },
    {
      path:'/product/:id',
      element:<Product />
    },{
      path:'/cart',
      element:<Cart />
    },{
      path:'/about',
      element:<About />
    },{
      path:'/forgetpassword',
      element:<ForgetPassword />
    }
  ])
  return <RouterProvider router={router}/>
}

export default App
