import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TreeItem, TreeView} from "@mui/lab";
import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";

import {getAllDeport, selectDepartment} from "../../../store/departmentSlice";
import Loader from "../../Present/Loader";

const DepInfo = () => {
  const departments = useSelector((state) => state.department.depAll);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllDeport()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const handleItemClick = (id) => {
    navigate(`/departments/${id}/employee`);
  };

  const handleCybersecurityClick = () => {
    dispatch(selectDepartment("cybersecurity"));
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
    <TreeView
      aria-label="tel spr"
      defaultExpandIcon={<Icon icon="material-symbols:keyboard-arrow-right"/>}
      defaultCollapseIcon={<Icon icon="material-symbols:keyboard-arrow-down"/>}
      expanded={["1"]}
      defaultSelected={["1"]}
      className="struct_dep_tree"
      defaultExpanded={allIds}
    >
      <TreeItem
        key="cybersecurity"
        nodeId="cybersecurity"
        label="Центр кибербезопасности"
        className="sctruct_dep_tree_item"
        onClick={handleCybersecurityClick}
      />
      {renderTree(departments)}
    </TreeView>
  );
};

export default DepInfo;
