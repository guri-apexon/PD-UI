import React, { useEffect, useState } from "react";
import "./protocols.scss";

import { useSelector, useDispatch } from "react-redux";
import Breadcrumbs from "apollo-react/components/Breadcrumbs";

import BASE_URL from "../../../utils/api";

const Protocols = () => {
  console.log("ENV", process.env);
  return (
    <div className="protocols">
      <h1>Protocols</h1>
      <h1>{BASE_URL}</h1>
      <h1>{process.env.REACT_APP_ANY_SECRET}</h1>
    </div>
  );
};

export default Protocols;
