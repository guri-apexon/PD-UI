import { useState } from "react";

const FileUpload = () => {
  const [imgSrc, setImgSrc] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setImgSrc(url);
  };
  return (
    <div>
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
