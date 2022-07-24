import { useState } from 'react';
import { storageService, dbService } from 'fbase';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import 'components/GimbapUpload.css';

function GimbapUpload() {
  const initGimbap = {
    gimbapName: "",
    ingredients: "",
    price: 0
  };
  const [gimbap, setGimbap] = useState(initGimbap);
  const [imageFile, setImageFile] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (imageFile !== "" && gimbap.gimbapName !== "" &&
      gimbap.ingredients !== "" && gimbap.price !== 0) {
        setUploading(true);
        let imageUrlRef = "";
        const imageFileRef = storageService.ref().child(`${gimbap.gimbapName}`);
        const response = await imageFileRef.putString(imageFile, "data_url");
        imageUrlRef = await response.ref.getDownloadURL();
        const newGimbap = {
          gimbapName: gimbap.gimbapName,
          imageUrl: imageUrlRef,
          ingredients: gimbap.ingredients,
          price: gimbap.price
        };
        await dbService.collection("gimbaps").add(newGimbap)
          .then(() => {
            setGimbap(initGimbap);
            setImageFile("");
            setMessage("");
            setUploading(false);
          });
    } else {
      setMessage("Please fill in all fields!");
    }
  };
  const onFileChange = (event) => {
    const { files } = event.target;
    const theFile = files[0];
    try {
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const { result } = finishedEvent.currentTarget;
        setImageFile(result);
      };
      reader.readAsDataURL(theFile);
    } catch (error) {
      // console.log(error);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    setGimbap({ ...gimbap, [name]: value });
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h4>Upload Gimbap</h4>
        <div className="mb-3 text-center">{message}</div>
        {imageFile !== "" && (
          <div className="text-center">
            <img src={imageFile} alt="preview" className="preview" />
          </div>
        )}
        <Form.Group as={Row} className="mt-3 mb-1">
          <Form.Label column sm="2">Image:</Form.Label>
          <Col>
            <Form.Control type="file" accept="image/*" onChange={onFileChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-1">
          <Form.Label column sm="2">Name:</Form.Label>
          <Col>
            <Form.Control type="text" name="gimbapName"
              value={gimbap.gimbap} onChange={onChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-1">
          <Form.Label column sm="2">Ingredients:</Form.Label>
          <Col>
            <Form.Control type="text" name="ingredients"
              value={gimbap.ingredients} onChange={onChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-1">
          <Form.Label column sm="2">Price:</Form.Label>
          <Col>
            <Form.Control type="number" name="price"
              value={gimbap.price} onChange={onChange} />
          </Col>
        </Form.Group>
        <Button type="submit" variant="dark" disabled={uploading}
          className="w-100 mt-3">
          {uploading ? (
            <>
            <Spinner as="span" animation="border" size="sm"
              role="status" aria-hidden="true" />
            <span className="visually-hidden">Uploading...</span>
            </>
          ) : "Upload"}
        </Button>
      </Form>
    </div>
  );
}

export default GimbapUpload;
