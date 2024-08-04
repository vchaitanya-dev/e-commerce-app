import { useEffect, useState} from "react";
import { db } from "../../firebase.config";
import useProductStore from "../../Hook/useProduct";
import Navbar from "../../Components/navbar/Navbar";
import {
  getDocs,
  collection,
  where,
  query,
  DocumentData
} from "firebase/firestore";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import "./product.scss";
import Footer from "../../Components/footer/Footer";
const Product = () => {
  const {setProductId} = useProductStore();
  const [recommendProduct,setRecommendProduct] = useState<DocumentData>([])
  const {setSingleProduct,productId,singleProduct} = useProductStore();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, where("title","==",`${productId}`));
         
         const listing:DocumentData = [];
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
          return listing.push({data:doc.data()});
          
        });
        setSingleProduct(listing[0])
      } catch (error) {
        console.error(error)
        toast.error("Error while loading Products");
      }
    };
    
    getProducts();

    const productList = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, where("category","==",`${singleProduct.data?.category}`));
         const listing: DocumentData = []
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
          return listing.push({ data:doc.data()});
          
        });
        setRecommendProduct(listing)
      } catch (error) {
        console.error(error)
        toast.error("Error while loading Products");
      }
    };
    
    productList();

  }, [productId, setSingleProduct, singleProduct.data?.category]);

  const featuresList = singleProduct.data?.keyFeatures.map((item: string) => {
    return  <p key={item}>{item}</p>
  });

  const productList = recommendProduct?.map((item: DocumentData) => {
    return  (
  <div className="productContainer">
        <img src={item?.data.image} alt="" />
        <p>{item?.data.title}</p>
        <div className="recommendInfo">
            <h4> ₹{item?.data.price}</h4>
            <Link to={`/product/${item?.data.title}`} className="link"
             onClick={() => setProductId(item?.data.title)}>View More</Link>
        </div>
 </div>
    )
  });
  return (
<>
<Navbar />

    <div className="container">
     <Link to="/" className="back" >&#x25c2; Back </Link>
      <div className="wrapper">
        <img src={singleProduct.data?.image} alt="" />
        <div className="textInfo">
        <h1>{singleProduct.data?.title}</h1>
       <div className="buyerSection">
       <p> <strong>₹</strong>
        {singleProduct.data?.price}</p>
       <button >Cart </button>
      <button >Buy </button>
       </div>
        <p><strong>Description:</strong>
        {singleProduct.data?.description}
        </p>
        <p><strong>Category:</strong>
        {singleProduct.data?.category}
        </p>
        <p><strong>Care Instruction:</strong>
        {singleProduct.data?.careInstructions}
        </p>
        
        <div className="specification">
         <h4>Key Features</h4>
          {featuresList}
        </div>
        </div>
      </div>

      <div className="recommendContainer">
       <h3>Recommend Products </h3>
      <div className="productWrapper">
        {productList}
      </div>

      </div>
    </div>
    <Footer />
</>
  )
}

export default Product