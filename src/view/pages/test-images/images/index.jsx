function ImageList({ images }) {
  return (
    <div>
      {images.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:8000/images/${image}`}
          alt={`Image ${index}`}
        />
      ))}
    </div>
  );
}

export default ImageList;
