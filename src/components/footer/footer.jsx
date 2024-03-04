import Logo from "../../assets/images/Logo.png";
import "./footer.scss";
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="footer-pic">
            <img src={Logo} alt="logo" className="footer-img" />
          </div>
          <div className="footer-name">
            <h2 className="footer-header">Ốc sên</h2>
          </div>
          <div className="footer-slogan">Ở trọn vẹn, sống tươi mới</div>
        </div>
        <div className="footer-copyright">Legal Notice - Privacy Policy</div>
      </div>
    </div>
  );
}

export default Footer;
