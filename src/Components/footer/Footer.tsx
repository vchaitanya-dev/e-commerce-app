import "./footer.scss";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer,Marker} from "react-leaflet";
import email from "../../assets/images/email.svg";
import call from "../../assets/images/call.svg";
import "leaflet/dist/leaflet.css";
const Footer = () => {
  return (
    <>
      <div className="linksection">
        <div className="link">
          <div className="menusection">
            <h2>Menu</h2>
            <Link to="/" className="urls">Home</Link>
            <Link to="/shop" className="urls" >Shop</Link>
            <Link to="/about" className="urls">About</Link>
          </div>
          <div className="mapsection">
            <MapContainer center={[17.3850, 78.4867]} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[17.3850, 78.4867]} />
              </MapContainer>
          </div>
          <div className="contactsection">
           <h2>Contact</h2>
            <div className="section">
            <img src={call} alt="locationicon" />
            <p>+91 98765 43210</p>
            </div>
            <div className="section">
              <img src={email} alt="locationicon" />
              <p>lejoyauprecieux@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="copyrightsection">
        <p>&copy; All right are resversed by Chaitanya vankar</p>
      </div>
    </>
  );
};

export default Footer;
