import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeCategory} from "../../store/mainSlice";

const Bread = () => {
  const activeCategory = useSelector((state) => state.main.activeCategory);
  const dispatch = useDispatch();

  const clearChildCategory = () => {
    dispatch(
      changeCategory({headerLink: activeCategory.header.link, childLink: ""})
    );
  };

  return (
    <div className="mb-2">
      <Link
        to={"/" + activeCategory.header.link}
        className="bread_link"
        onClick={clearChildCategory}
      >
        {activeCategory.header.label}
      </Link>

      <Link to={activeCategory.child?.link} className="bread_link">
         / {activeCategory.child?.label}
      </Link>
    </div>
  );
};

export default Bread;
