import { createBrand } from '../../http/deviceApi';
import React, { useState, useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../../index';
import { observer } from 'mobx-react';
import { deleteBrand } from '../../http/deviceApi';
import { fetchBrands } from '../../http/deviceApi';

const CreateBrand = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [value, setValue] = useState('');

  const addBrand = async () => {
    await createBrand({ name: value });
    const brands = await fetchBrands();
    device.setBrands(brands);
    setValue('');
  };

  const handleDeleteBrand = (id) => {
    device.deleteBrand(id);
    deleteBrand(id);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <Form>
            <Form.Control
              className=""
              placeholder="Enter brand name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form>
          <Button
            variant="outline-success"
            onClick={addBrand}
            className="ms-auto"
          >
            Add brand
          </Button>
        </div>
        {device.brands && (
          <div>
            <h4 className="mt-2">Existing Brands:</h4>
            {device.brands.map((brand) => (
              <div className="mt-2 d-flex" key={brand.id}>
                <div>{brand.name}</div>
                <Button
                  className="ms-auto"
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteBrand(brand.id)}
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

export default observer(CreateBrand);
