import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TreeItem, TreeView} from "@mui/lab";
import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";


import {getAllDeport, selectDepartment} from "../../../store/departmentSlice";
import Loader from "../../Present/Loader";
import {Button} from "react-bootstrap";
import TokenService from "../../../services/token.service";

const DepInfo = () => {
  const departments = useSelector((state) => state.department.depAll);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [, setSelectedItem] = useState(null);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");


  useEffect(() => {
    dispatch(getAllDeport()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const handleItemClick = (id) => {
    setSelectedItem(id);
    navigate(`/departments/${id}/employees`);
  };

  const handleCybersecurityClick = () => {
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
          style={{backgroundColor: '#99cba2', color: '#fff'}}>
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
      > {(visibleAdmin || visibleEditor) ? (
        <div>
          <Button variant="success" onClick={handleCybersecurityClick}>
            Добавить подразделение
          </Button>
        </div>
      ) : null}
        {renderTree(departments)}
      </TreeView>
    </>
  );

};

export default DepInfo;
