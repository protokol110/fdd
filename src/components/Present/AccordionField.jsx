import {Accordion} from "react-bootstrap";
import parse from "html-react-parser";

const AccordionField = ({header, body}) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0" className="accordion_field_item">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>{parse(body)}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionField;
