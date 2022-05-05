import Loader from "../../../../../Components/Loader/Loader";

const RenderLoader = () => {
  return (
    <div
      style={{
        height: 400,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Loader />
    </div>
  );
};
export default RenderLoader;
