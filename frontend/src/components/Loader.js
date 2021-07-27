import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    // <Spinner
    //   animation='border'
    //   role='status'
    //   style={{
    //     width: '100px',
    //     height: '100px',
    //     margin: 'auto',
    //     display: 'block',
    //   }}
    // >
    //   <span className='sr-only'>Loading...</span>
    // </Spinner>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="loader">
            <div class="loader-inner box1"></div>
            <div class="loader-inner box2"></div>
            <div class="loader-inner box3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
