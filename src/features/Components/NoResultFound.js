import React from "react";

const NoResultFound = (props) => {
  const style = {
    parent: {
      display: "flex",
      height: 400,
    },
    child: {
      margin: "auto",
    },
  };
  return (
    <div style={style.parent}>
      <h3 style={style.child}>No Result Found</h3>
    </div>
  );
};

export default NoResultFound;
