import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Banners from "../Container/Banners";
import { changeCurrArhYear } from "store/postSlice";

const RightSidePanel = () => {
 /* const postsArhYears = useSelector((state) => state.post.postsArhYears);
  const currArhYear = useSelector((state) => state.post.currArhYear);
  const location = useLocation();
  const dispatch = useDispatch();*/

  return (
    <div className="main_part_right">
      <div className="rightSidePanel_menu">
        {/*{location.pathname === "/arh"
          ? postsArhYears.map((year) => (
            <Button
              key={year}
              type="button"
              variant={`${currArhYear === year ? "success" : "outline-success"
              }`}
              className={`${currArhYear === year ? "btn-success" : "btn-outline-success"
              } mx-5 my-1`}
              onClick={() => {
                dispatch(changeCurrArhYear(year));
              }}
            >
              {year}
            </Button>
          ))
          : ""}*/}
      </div>

      <div className="rightSidePanel_banners">
        <Banners />
      </div>
    </div>
  );
};

export default RightSidePanel;
