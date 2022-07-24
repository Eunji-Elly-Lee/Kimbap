import { useState } from 'react';
import { dbService } from 'fbase';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ManageLocation({ location }) {
  const [editing, setEditing] = useState(false);
  const [newLocation, setNewLocation] = useState(location.location);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`locations/${location.id}`).update({
      location: newLocation
    });
    setEditing(false);
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this?");
    if (ok) {
      await dbService.doc(`locations/${location.id}`).delete();
    }
  };

  return (
    <div className="mt-2">
      {editing? (
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control type="text" value={newLocation}
              onChange={(event) => setNewLocation(event.target.value)} />
          </Form.Group>
          <Button type="submit" className="mt-2">Update</Button>
          <Button variant="outline-dark" className="mt-2 ms-1 rounded-0"
            onClick={toggleEditing}>
            Cancel
          </Button>
        </Form>
      ) : (
        <>
        {location.location}
        <Button type="submit" className="ms-3" onClick={toggleEditing}>
          Edit
        </Button>
        <Button type="submit" className="ms-1" onClick={onDeleteClick}>
          Delete
        </Button>
        </>
      )}
    </div>
  );
}

ManageLocation.propTypes = {
  location: PropTypes.object
};

export default ManageLocation;
