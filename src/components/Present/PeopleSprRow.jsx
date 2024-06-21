import {useState} from "react";
import {Icon} from "@iconify/react";
import {AnimatePresence, motion} from "framer-motion";

const PeopleSprRow = ({people}) => {
  const [expanded, setExpanded] = useState(false);
  const containerAnim = {
    default: {
      height: 0,
    },
    collapsed: {
      height: "auto",
      transition: {
        when: "beforeChildren",
        duration: 0.2,
      },
    },
    exit: {
      height: "0",
      transition: {
        when: "afterChildren",
        duration: 0.2,
      },
    },
  };
  const anim = {
    default: {opacity: 0, scale: 0.8},
    collapsed: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <li key={people.zp_tbn}>
      <div
        className={`${
          expanded
            ? "struct_dep_peoples_row_open"
            : "struct_dep_peoples_row_close"
        } struct_dep_peoples_row`}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="struct_dep_peoples_row_card">
          {expanded ? (
            <div>
              <Icon
                icon="ic:baseline-minus"
                className="struct_dep_peoples_row_card_img"
              />
            </div>
          ) : (
            <div>
              <Icon
                icon="ic:baseline-plus"
                className="struct_dep_peoples_row_card_img"
              />
            </div>
          )}
          <div>
            <div className="struct_dep_peoples_row_card_post">
              {people.dolg}
            </div>
            <div className="struct_dep_peoples_row_card_fio">{people.fio}</div>
          </div>
        </div>

        {people.dstart === "" ? null : (
          <div className="struct_dep_peoples_row_card_abs">
            Отсутствие:{" "}
            <span>
              {people.dstart} - {people.dend}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="struct_dep_peoples_row_card_info"
            variants={containerAnim}
            initial="default"
            animate="collapsed"
            exit="exit"
          >
            <motion.div variants={anim}>
              <span className="struct_dep_peoples_row_card_info_header">
                Телефон:
              </span>
              <div className="struct_dep_peoples_row_card_info_tel">
                {people.ph_int && <div>{people.ph_int[0]} вн.</div>}
                {people.ph_num && <div>{people.ph_num[0]} гор.</div>}
                {people.ph_mob && <div>{people.ph_mob[0]} моб.</div>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default PeopleSprRow;
