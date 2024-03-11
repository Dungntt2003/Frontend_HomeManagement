import "./announce.scss";
import AnnounceItem from "../announce-item/announce-item";

function Announce() {
  const AnnounceItems = [...Array(6)].map((_, index) => (
    <AnnounceItem key={index} title="Item" />
  ));
  return (
    <div>
      <div>{AnnounceItems}</div>
    </div>
  );
}

export default Announce;
// / const homeItems = [...Array(8)].map((_, index) => (
//   <HomeItem key={index} title="Item" />
// ));
// return (
//   <div className="homepage-container">
//     <div className="home-item">{homeItems}</div>
//   </div>
// );/
