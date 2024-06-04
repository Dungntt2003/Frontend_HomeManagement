import "./announce.css";
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
