import Header from "../../Components/header/Header";
import {Link} from 'react-router-dom';
import {useEffect} from "react";
import "./home.scss";
import ShopList from "../../Components/shop/ShopList";
import useDataStore from "../../Hook/useData";
import { db } from "../../firebase.config";
import {
  getDocs,
  collection,
  limit,
  query,
  DocumentData,
} from "firebase/firestore";
import about from '../../assets/images/about.jpg';
import Footer from '../../Components/footer/Footer';
import { toast } from "react-toastify";

const Home = () => {
  const { products, allProducts } = useDataStore();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const listingRef = collection(db, "listings");
       let q;
        if(window.screen.width > 600){
          q = query(listingRef, limit(8))
        }
        else{
          q = query(listingRef, limit(4))
        }
        const listing: DocumentData = [];
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        allProducts(listing);
      } catch (error) {
        console.error(error)
        toast.error("Error while loading Products");
      }
    };
    getProducts();
  }, [allProducts]);

  const productItem = products.map((item: DocumentData) => {
    return <ShopList id={item.id} key={item.id} listing={item.data} />;
  });
  return (
<>
<div className="hero_section">
<Header />
<div className="hero_container">
 <div className="text">
 <h1>Best Jewellery <br/> Collection</h1>
  <p>
  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem
  </p>
 </div>
  <Link to="/shop" className="shop_link">
  Shop Now
  </Link>
</div>
</div>
{/* Product List */}
<div className="productContainer">
<h1>Our Products</h1>
<div className="productwrapper">
{
  productItem
}
</div>
<Link to="/shop">View All Product</Link>
</div>
{/* about us  */}
<div className="aboutus">
<img src={about} alt="about image"className="aboutimage" />
  <div className="about">
    <h2>About us </h2>
    <p>
    Explore our Indian jewellery e-commerce website, showcasing exquisite handcrafted pieces that blend tradition with modern elegance. From stunning gold and silver designs to vibrant gemstones, our collection offers something for every occasion. Enjoy a seamless shopping experience with secure payments, fast shipping, and exceptional customer service. Discover timeless beauty today!
    </p>
  </div>
</div>

<div className="offers">
<div className="firstimage">
  <h2>Upto 15% Off</h2>
  <button>Shop Now</button>
</div>
  <div className="twoimages">
    <div className="secondimage">
    <div className="text">
    <h2>Upto 15% Off</h2>
    <button>Shop Now</button>
    </div>
    </div>
    <div className="thirdimage">
    <div className="text">
    <h2>Upto 15% Off</h2>
    <button>Shop Now</button>
    </div>
    </div>
  </div>
</div>

<Footer />
</>
  )
}

export default Home;