import { useState } from "react";
import "./fileUpload.scss";

const FileUpload = ({ deleteImage }) => {
  const [imgSrc, setImgSrc] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setImgSrc(url);
  };
  return (
    <div className="image-container">
      {imgSrc && (
        <div className="image-buttons">
          <button className="button delete" onClick={deleteImage}>
            Delete Image
          </button>
        </div>
      )}
      <form>
        <input
          type="file"
          name="user[image]"
          multiple="false"
          onChange={handleFileUpload}
          accept="image/*"
        />
      </form>

      {imgSrc && (
        <img
          src={imgSrc}
          alt="import"
          style={{
            marginTop: 10,
            height: "auto",
            maxWidth: "100%",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
};

export default FileUpload;
