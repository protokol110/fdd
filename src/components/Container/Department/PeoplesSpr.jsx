import {useSelector} from "react-redux";
import PeopleSprRow from "../../Present/PeopleSprRow";

const PeoplesSpr = () => {
  const peoplesData = useSelector(
    (state) => state.department.telSprData.peaples
  );
  const activeDep = useSelector((state) => state.department.telSprDataActive);

  return (
    <div className="struct_dep_peoples">
      {peoplesData
        .filter((people) => people.id === activeDep)
        .map((people) => {
          return <PeopleSprRow key={people.zp_tbn} people={people}/>;
        })}
    </div>
  );
};

export default PeoplesSpr;
