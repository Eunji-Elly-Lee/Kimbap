import { Button, Form } from 'react-bootstrap';
import './Menu.css';

function Menu() {
  return (
    <div className="menu">
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
