import { Form } from 'react-bootstrap';
import 'components/Gimbap.css';

function Gimbap() {
  return (
    <div className="mb-4">
      <h4>Gimbaps</h4>
      <Form.Group className="mt-3">
        <div className="d-flex">
          <Form.Check type="checkbox" id="gimbap01" />
          <Form.Label htmlFor="gimbap01" className="ms-2">
            Gimbpa01
          </Form.Label>
          <Form.Label className="mx-2">
            $ 5.00
          </Form.Label>
          <Form.Control type="number" className="nums" />
        </div>
        <img src="./logo192.png" alt="gimbap01" />
        <p>Ingredient01, Ingredient02, Ingredient03, Ingredient04</p>
      </Form.Group>
      <Form.Group className="mt-3">
        <div className="d-flex">
          <Form.Check type="checkbox" id="gimbap02" />
          <Form.Label htmlFor="gimbap02" className="ms-2">
            Gimbpa02
          </Form.Label>
          <Form.Label className="mx-2">
            $ 5.00
          </Form.Label>
          <Form.Control type="number" className="nums" />
        </div>
        <img src="./logo192.png" alt="gimbap02" />
        <p>Ingredient01, Ingredient02, Ingredient03, Ingredient04</p>
      </Form.Group>
    </div>
  );
}

export default Gimbap;
