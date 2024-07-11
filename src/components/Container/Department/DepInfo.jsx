import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TreeItem, TreeView} from "@mui/lab";
import {Icon} from "@iconify/react";
import Loader from "../../Present/Loader";
import {getAllDeport, setIdDep} from "../../../store/departmentSlice";
import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import TokenService from "../../../services/token.service";

const DepInfo = () => {
  const departments = useSelector((state) => state.department.depAll);
  const idDep = useSelector((state) => state.department.idDep);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDeport()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const handleItemClick = (id) => {
    dispatch(setIdDep(id));
  };

  const handleCreate = () => {
    navigate(`/contacts/create`);
  };

  const renderTree = (nodes) => {
    return nodes.map((node) => {
      return (
        <TreeItem
          key={node.id}
          nodeId={node.id.toString()}
          label={node.nameDeport}
          className="sctruct_dep_tree_item"
          onClick={() => handleItemClick(node.id)}
        >
        </TreeItem>
      );
    });
  };

  const allIds = departments.reduce((ids, department) => {
    ids.push(department.id.toString());
    department.users.forEach((user) => ids.push(user.id.toString()));
    return ids;
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <TreeView
        aria-label="tel spr"
        defaultExpandIcon={<Icon icon="material-symbols:keyboard-arrow-right"/>}
        defaultCollapseIcon={<Icon icon="material-symbols:keyboard-arrow-down"/>}
        expanded={["1"]}
        defaultSelected={["1"]}
        className="struct_dep_tree"
        defaultExpanded={allIds}
      >
        {visibleAdmin || visibleEditor ?
          <Button variant={"success"} onClick={handleCreate} style={{backgroundColor: "#34606BFF", border: "none"}}>Создать
            подразделение</Button> : null}
        {renderTree(departments)}
        {idDep && (visibleAdmin || visibleEditor) &&
          <>
            <Button variant="success" onClick={() => navigate(`/employee/${idDep}/add`)} className="struct_marging_top">Добавить
              сотрудника</Button>
            <Button variant="success" onClick={() => navigate(`/departments/${idDep}/edit`)} className="struct_marging">Изменить
              подразделение</Button>
          </>
        }
      </TreeView>
    </>
  );
};

export default DepInfo;
