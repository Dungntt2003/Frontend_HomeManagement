import HomeItem from "../homeItem";
import "./homepage.scss";
function HomePage() {
  const homeItems = [...Array(8)].map((_, index) => (
    <HomeItem key={index} title="Item" />
  ));
  return (
    <div className="homepage-container">
      <div className="home-item">{homeItems}</div>
    </div>
  );
}

export default HomePage;
