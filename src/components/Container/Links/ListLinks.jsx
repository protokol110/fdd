import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getLinks, setLinkCreated, setLinkDeleted, setLinkUpdated} from "../../../store/linksSlice";
import {Pagination, Button} from "react-bootstrap";
import LinkRow from "./LinkRow";
import Loader from "../../Present/Loader";
import Bread from "../Bread";
import ModalError from "../../Modals/ModalError";
import {clearError} from "../../../store/mainSlice";
import {setCurrPage} from "../../../store/postSlice";
import TokenService from "../../../services/token.service";

const ListLinks = () => {

  const hasRole = (role) => TokenService.isHaveRole(role);
  const visibleAdmin = hasRole("ROLE_ADMIN");
  const visibleEditor = hasRole("ROLE_EDITOR");
  const currPage = useSelector((state) => state.links.currPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkDeleted = useSelector((state) => state.links.linkDeleted);
  const linkCreated = useSelector((state) => state.links.linkCreated);
  const linkUpdated = useSelector((state) => state.links.linkUpdated);

  useEffect(() => {
    dispatch(getLinks());
    if (linkDeleted || linkCreated || linkUpdated) {
      dispatch(setLinkDeleted(false));
      dispatch(setLinkCreated(false));
      dispatch(setLinkUpdated(false));
    }
  }, [dispatch, currPage, linkDeleted, linkCreated, linkUpdated]);

  useEffect(() => {
    console.log()
  }, );

  const links = useSelector((state) => state.links.links);
  const loading = useSelector((state) => state.links.loading);
  const error = useSelector((state) => state.links.error);
  const totalPages = useSelector((state) => state.links.totalPages);

  let pages = [];
  for (let number = 1; number <= totalPages; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currPage}
        onClick={() => {
          dispatch(setCurrPage(number));
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  let content = (
    <>
      <Bread/>
      {(visibleAdmin || visibleEditor) && (
        <Button
          variant="success"
          type="submit"
          className="mb-3"
          onClick={() => {
            navigate(`/links/new`);
          }}
          style={{backgroundColor: "#34606BFF", border: "none"}}
        >
          Добавить
        </Button>
      )}
      {links.map((link) => {
        return (
          <LinkRow
            link={link}
            key={link.id}
            style={{color: "#34606BFF"}}
            onClick={() => navigate(`/post/${link.id}/edit`)}
          />
        );
      })}

      <div className="link_pagination">
        <Pagination>{pages}</Pagination>
      </div>
    </>
  );

  if (error.show)
    return (
      <ModalError
        show={error.show}
        errText={error.text}
        handleClose={() => {
          dispatch(clearError());
        }}
      />
    );
  if (loading) return <Loader/>;
  return content;
};

export default ListLinks;
