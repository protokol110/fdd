import TokenService from "../../services/token.service";

const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

const TableHeader = ({labels}) => {
  return (
    <tr className="table_header_row">
      {labels.map((label, idx) => {
        return label !== "Действия" ? (
          <th className="table_header_cell" key={idx}>
            {label}
          </th>
        ) : visibleAdmin || visibleEditor ? (
          <th className="table_header_cell" key={idx}>
            {label}
          </th>
        ) : null;
      })}
    </tr>
  );
};

export default TableHeader;
