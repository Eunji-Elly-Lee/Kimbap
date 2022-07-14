import Upload from "components/Upload";
import { Form, Button } from 'react-bootstrap';
import 'routes/Menu.css';

function Menu() {
  return (
    <div className="menu">
      <Upload />
      <Form>
        <Button variant="dark" type="submit"
          className="rounded-0">
          Order
        </Button>
      </Form>
    </div>
  );
}

export default Menu;
