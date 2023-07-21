import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./pageNav.scss";
// import { Button } from "@mui/material";
function PageNav(props) {
  // console.log(props);
    // to move to the prevPage
    const prevPage = () => {
      if (props.pageNumber === 1) return;
      props.setPageNumber((prevPage)=>{
        return prevPage-1;
      });
    };
  
    // to move to the NextPage
    const nextPage = () => {
      props.setPageNumber((prevPage)=>{
        return prevPage+1;
      })
    };
  
    // to move to any page number
    const skipPage = (val) => {
      if (val !== NaN) setPageNumber(val);
    };

  const pageHandler = (e) => {
    if (e.keyCode == 13) {
      const result = e.target.value.replace(/\D/g, "");
      const value = parseInt(result);
      skipPage(value);
      e.target.value = "";
    }
  };
  return (
    <div className="pageNav">
      <button className="pageNav-prev" onClick={prevPage}>
        <KeyboardArrowLeftIcon />
        <p>Previous</p>
      </button>
      <div className="pageNav-pagenumb">
        <p className="pageNav-pagenumb__para">Page</p>
        <input
          type="text"
          className="pageNav-pagenumb__input"
          placeholder={props.pageNumber}
          onKeyDown={pageHandler}
        />
      </div>
      <button className="pageNav-next" onClick={nextPage}>
        <p>Next</p>
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );
}
export default PageNav;
