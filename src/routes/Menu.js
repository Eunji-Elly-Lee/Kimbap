import Gimbap from 'components/Gimbap';
import Location from 'components/Location';
import Upload from 'components/Upload';
import { Form, Button } from 'react-bootstrap';
import 'routes/Menu.css';

function Menu() {
  return (
    <div className="menu mx-auto mt-4">
      <Upload />
      <Form className="mt-4">
        <Gimbap />
        <Location />
        <Button type="submit" className="w-100 mt-3">
          Order
        </Button>
      </Form>
    </div>
  );
}

export default Menu;
