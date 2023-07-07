import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./pageNav.scss";
// import { Button } from "@mui/material";
function PageNav(props) {
  // console.log(props);
  const pageHandler = (e) => {
    if (e.keyCode == 13) {
      const result = e.target.value.replace(/\D/g, "");
      const value = parseInt(result);
      props.page.skipPage(value);
      e.target.value = "";
    }
  };
  return (
    <div className="pageNav">
      <button className="pageNav-prev" onClick={props.page.prevPage}>
        <KeyboardArrowLeftIcon />
        <p>Previous</p>
      </button>
      <div className="pageNav-pagenumb">
        <p className="pageNav-pagenumb__para">Page</p>
        <input
          type="text"
          className="pageNav-pagenumb__input"
          placeholder={props.page.pageNumber}
          onKeyDown={pageHandler}
        />
      </div>
      <button className="pageNav-next" onClick={props.page.nextPage}>
        <p>Next</p>
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );
}
export default PageNav;
