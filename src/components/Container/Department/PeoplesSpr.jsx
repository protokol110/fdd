import {useSelector} from "react-redux";
import PeopleSprRow from "../../Present/PeopleSprRow";

const PeoplesSpr = () => {
  const id = useSelector((state) => state.department.idDep);
  const peoplesData = useSelector(
    (state) => state.department.depAll
  );

  return (
    <div className="struct_dep_peoples">
      {peoplesData
        .filter((people) => people.id === id)
        .map((people) => {
          return <PeopleSprRow key={people.id} people={people}/>;
        })}
    </div>
  );
};

export default PeoplesSpr;
