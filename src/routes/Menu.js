import Upload from 'components/Upload';
import { Form, Button } from 'react-bootstrap';
import 'routes/Menu.css';

function Menu() {
  return (
    <div className="menu mx-auto mt-4">
      <Upload />
      <Form className="mt-4">
        <Button variant="dark" type="submit"
          className="w-100 mt-3 rounded-0">
          Order
        </Button>
      </Form>
    </div>
  );
}

export default Menu;
