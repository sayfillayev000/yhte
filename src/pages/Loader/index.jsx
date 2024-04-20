import { Oval } from "react-loader-spinner";
import React from "react";
import "./loader.scss";

const index = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <Oval
          visible={true}
          height="60"
          width="60"
          color="#001"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
            secondaryColor="aqua"
          strokeWidth="3"
        />
      </div>
    </div>
  );
};

export default index;
