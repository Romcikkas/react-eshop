import CreateType from '../components/modals/CreateType';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import DeleteDevice from '../components/modals/DeleteDevice';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false);

  return (
    <Container className=" d-flex flex-column m-1 mx-auto">
      <Button
        variant="outline-dark"
        className="mt-2 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Add type
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Add brand
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Add device
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2 p-2"
        onClick={() => setDeleteDeviceVisible(true)}
      >
        Delete device
      </Button>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <DeleteDevice
        show={deleteDeviceVisible}
        onHide={() => setDeleteDeviceVisible(false)}
      />
    </Container>
  );
};

export default Admin;
