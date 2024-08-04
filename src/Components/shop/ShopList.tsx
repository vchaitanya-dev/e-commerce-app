import {DocumentData} from "firebase/firestore";
import "./shoplist.scss";
import {Link} from 'react-router-dom';
import useProductStore from "../../Hook/useProduct";
interface props {
    listing:DocumentData,
    id:string
}

function ShopList({listing,id}:props) {
    const {setProductId} = useProductStore();

   
 return (
<div className="container">
    <div className="shopItem" key={id}>
        <img src={listing.image} alt="" />
        <p>{listing.title}</p>
        <div className="info">
            <h4>{listing.price}</h4>
            <Link to={`/product/${listing.title}`} 
            className="link"
            onClick={() => setProductId(listing.title)}>View More</Link>
        </div>
    </div>
</div>
)
}

export default ShopList