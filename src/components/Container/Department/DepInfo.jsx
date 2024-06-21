import {TreeItem, TreeView} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {Icon} from "@iconify/react";

import {changeAbout} from "../../../store/departmentSlice";

const DepInfo = () => {
  const data = useSelector((state) => state.department.dataAbout);

  const dispatch = useDispatch();
  const handleSelect = (_, id) => {
    dispatch(changeAbout({payload: id, type: "upr"}));
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      className="sctruct_dep_tree_item"
    >
      {Array.isArray(nodes.podrs)
        ? nodes.podrs.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="tel spr"
      defaultExpandIcon={<Icon icon="material-symbols:keyboard-arrow-right"/>}
      defaultCollapseIcon={<Icon icon="material-symbols:keyboard-arrow-down"/>}
      onNodeSelect={handleSelect}
      expanded={["1"]}
      defaultSelected={["1"]}
      className="struct_dep_tree"
    >
      {renderTree(data)}
    </TreeView>
  );
};

export default DepInfo;
