import { createType } from '../../http/deviceApi';
import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { fetchTypes } from '../../http/deviceApi';
import { Context } from '../../index';
import { deleteType } from '../../http/deviceApi';

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('');
  const { device } = useContext(Context);

  const addType = async () => {
    await createType({ name: value });
    const types = await fetchTypes();
    device.setTypes(types);
    setValue('');
  };

  const handleDeleteType = (id) => {
    device.deleteType(id);
    deleteType(id);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <Form>
            <Form.Control
              placeholder="Enter type name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form>
          <Button
            variant="outline-success"
            onClick={addType}
            className="ms-auto"
          >
            Add type
          </Button>
        </div>
        {device.types && (
          <div>
            <h4 className="mt-2">Existing Brands:</h4>
            {device.types.map((type) => (
              <div className="mt-2 d-flex" key={type.id}>
                <div>{type.name}</div>
                <Button
                  className="ms-auto"
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteType(type.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default observer(CreateType);
