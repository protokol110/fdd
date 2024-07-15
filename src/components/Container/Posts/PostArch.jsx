import React from "react";
import {useLocation} from "react-router-dom";
import PostsArhBlock from "./PostsArhBlock";
import * as postsArhYears from "react-bootstrap/ElementChildren";
import {Button} from "react-bootstrap";
import {changeCurrArhYear} from "../../../store/postSlice";
import {useDispatch, useSelector} from "react-redux";

const PostArch = () => {
  const postsArhYears = useSelector((state) => state.post.postsArhYears);
  const currArhYear = useSelector((state) => state.post.currArhYear);
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div style={{position: "relative"}}>
      <PostsArhBlock/>

      {location.pathname === "/arh"
        ? postsArhYears.map((year) => (
          <>
            <Button
              key={year}
              type="button"
              style={{backgroundColor: "#34606BFF", border: "none", position: "absolute", right: 20, top: 20}}
              variant={`${currArhYear === year ? "success" : "outline-success"
              }`}
              className={`float-right mx-5 my-1`}
              onClick={() => {
                dispatch(changeCurrArhYear(year));
              }}
            >
              {year}
            </Button>
          </>
        ))
        : ""}
    </div>
  );
};

export default PostArch;
