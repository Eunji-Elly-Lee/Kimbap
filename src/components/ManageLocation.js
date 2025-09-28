import { useState } from 'react';
import { dbService } from 'fbase';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ManageLocation({ location }) {
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [newLocation, setNewLocation] = useState(location.location);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (newLocation === "") {
      setMessage("Please fill in this field!");
    } else {
      const regExp = /^\d{4}\.\d{2}\.\d{2}\s[\w.:-\s]+$/;
      if (regExp.test(newLocation)) {
        await dbService.doc(`locations/${location.id}`).update({
          location: newLocation
        });
        setMessage("");
        setEditing(false);
      } else {
        setMessage("Please enter according to pattern!");
      }
    }
  };
  const toggleEditing = () => {
    setMessage("");
    setEditing((prev) => !prev);
    setNewLocation(location.location);
  };
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this?");
    if (ok) {
      await dbService.doc(`locations/${location.id}`).delete();
    }
  };

  return (
    <div className="mt-2">
      {message}
      {editing ? (
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control type="text" value={newLocation}
              onChange={(event) => setNewLocation(event.target.value)} />
          </Form.Group>
          <Button type="submit" className="mt-2">Update</Button>
          <Button variant="outline-dark" className="mt-2 ms-1 px-3"
            onClick={toggleEditing}>
            Cancel
          </Button>
        </Form>
      ) : (
        <>
          <div>{location.location}</div>
          <div className="d-flex gap-1 mt-1 mb-3">
            <Button type="submit" className="px-4" onClick={toggleEditing}>
              Edit
            </Button>
            <Button type="submit" className="px-3" onClick={onDeleteClick}>
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

ManageLocation.propTypes = {
  location: PropTypes.object
};

export default ManageLocation;
