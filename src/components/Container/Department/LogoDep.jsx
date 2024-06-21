import {Image} from "react-bootstrap";
import {changeAbout} from "../../../store/departmentSlice";
import {useDispatch} from "react-redux";

const LogoDep = ({upr}) => {
  const dispatch = useDispatch();

  return (
    <div
      className="logoDep_card"
      onClick={() => {
        dispatch(changeAbout({payload: upr.id, type: "upr"}));
      }}
    >
      <div className="logoDep_card_logo">
        <Image
          className="logoDep_card_logo_img mx-3"
          src={`data:image/jpeg;base64,${upr.icon}`}
        />
      </div>
      <div className="logoDep_card_text">{upr.nameUpravlen}</div>
    </div>
  );
};

export default LogoDep;
