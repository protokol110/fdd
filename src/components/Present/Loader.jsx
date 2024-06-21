import {RotatingTriangles} from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader_center">
      <RotatingTriangles
        height="180"
        width="180"
        colors={["#278f51", "#00c77f", "#71ceac"]}
      />
    </div>
  );
};

export default Loader;
