import {FormControl, Image, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeCategory} from "../../store/mainSlice";
import {changeSearch, changeSearchStatus} from "../../store/postSlice";

import LogoTop from "../../assets/logo/header-toprow-belarusbank.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headerCategory = useSelector((state) => state.main.headerCategory);
  const search = useSelector((state) => state.post.search);

  const pressKey = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      dispatch(changeSearchStatus());
      navigate("/search");
    }
  };

  const handleChange = (event) => {
    dispatch(changeSearch(event.target.value));
  };

  return (
    <div className="header">
      <div className="header_toprow">
        <div className="header_toprow_logo">
          <a href="https://belarusbank.by/" target="_blank" rel="noreferrer">
            <Image className="mx-3" src={LogoTop}/>
          </a>
        </div>

        <div className="header_toprow_search">
          <div className="mx-1 my-2 header_searchbar_search">
            <FormControl
              type="search"
              name="search"
              value={search}
              placeholder="Поиск по сайту"
              className="me-4"
              aria-label="Search"
              onKeyDown={pressKey}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="header_botrow">
        <div className="header_botrow_logo">
        </div>

        <Navbar>
          {headerCategory.map((header) => {
            return header.children.length > 0 ? (
              <NavDropdown
                id={header.id}
                key={header.id}
                title={header.label}
                className="header_link"
              >
                {header.children.map((child) => {
                  return (
                    <NavDropdown.Item
                      eventKey={child.link}
                      key={child.id}
                      onClick={() => {
                        dispatch(
                          changeCategory({
                            headerLink: header.link,
                            childLink: child.link,
                          })
                        );
                        navigate(`/${child.link}`);
                      }}
                    >
                      {child.label}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            ) : (
              <div className="header_link" key={header.id}>
                <Link
                  to={header.link}
                  onClick={() =>
                    dispatch(
                      changeCategory({
                        headerLink: header.link,
                        childLink: header.link,
                      })
                    )
                  }
                >
                  {header.label}
                </Link>
              </div>
            );
          })}
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
