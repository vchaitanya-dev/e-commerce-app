import Header from "../../Components/navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import "./shop.scss";
import { db } from "../../firebase.config";
import useDataStore from "../../Hook/useData";
import {
  getDocs,
  collection,
  limit,
  query,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "../../Components/Spinner/Loader";
import "react-medium-image-zoom/dist/styles.css";
import { toast } from "react-toastify";
import ShopList from "../../Components/shop/ShopList";

const Shop = () => {
  const { products, allProducts } = useDataStore();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, limit(12));
        const listing: DocumentData = [];
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        allProducts(listing);
        setLoading(true);
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
      <Header />
      <div className="shopcontainer">
        <h1>Shop</h1>
        <div className="shop">
          <div className="right">
            {loading === false ? (
              <Loader />
            ) : products && products.length > 0 ? (
              <>
                <div className="container">{productItem}</div>
                <br />
                <br />
              </>
            ) : (
              <p>There are no products</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
