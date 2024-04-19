import React, { useEffect, useState } from "react";
// import ImageList from "./images";
import testApi from "../../../api/testApi";
import ImageList from "./images";

function TestImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImagesTest = async () => {
      try {
        const response = await testApi.getImages();
        console.log(response.data[0].image);
        setImages(response.data[0].image);
      } catch (err) {
        console.log(err);
      }
    };
    getImagesTest();
  }, []);

  return (
    <div>
      <h1>Image List</h1>
      <ImageList images={images} />
    </div>
  );
}

export default TestImages;
