import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Modal, Pagination, Form } from 'react-bootstrap';
import { Context } from '../../index';
import { deleteDevice } from '../../http/deviceApi';
import { fetchDevices } from '../../http/deviceApi';
import { searchDevices } from '../../http/deviceApi';

const DeleteDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);

  const deleteModalLimit = 2;

  const pageCount = Math.ceil(device.totalCount / deleteModalLimit);

  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  useEffect(() => {
    const fetchAllDevices = async () => {
      await fetchDevices(
        device.selectedType.id,
        device.selectedBrand.id,
        device.page,
        deleteModalLimit
      ).then((data) => {
        device.setTotalCount(data.count);
        device.setDevices(data.rows);
      });
    };

    fetchAllDevices();
  }, [
    device.selectedType.id,
    device.selectedBrand.id,
    device.page,
    device.limit,
  ]);

  const handleDelete = async (id) => {
    try {
      await deleteDevice(id);
      device.setDevices(device.devices.filter((d) => d.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (device.searchInput.length === 0) {
      device.setUseFilteredDevices(false);
      fetchDevices(
        device.selectedType.id,
        device.selectedBrand.id,
        device.page,
        deleteModalLimit
      ).then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    } else if (device.searchInput.length !== 0) {
      device.setUseFilteredDevices(true);
      searchDevices(device.searchInput, device.page, deleteModalLimit).then(
        (data) => {
          device.setFilteredDevices(data.rows);
          device.setTotalCount(data.count);
        }
      );
    }
  }, [
    device.page,
    device.selectedType.id,
    device.selectedBrand.id,
    device.useFilteredDevices,
    device.searchInput,
  ]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Search devices..."
            value={device.searchInput}
            onChange={(e) => {
              device.setSearchInput(e.target.value);
            }}
          />
        </Form>
        <div>
          <h4 className="mt-2">Existing Devices:</h4>

          {device.devices.map((device) => (
            <div className="mt-2 d-flex" key={device.id}>
              <div>{device.name} - &nbsp;</div>
              <div>{device.price} Eur</div>
              <Button
                className="ms-auto"
                variant="danger"
                size="sm"
                variant="danger"
                onClick={() => handleDelete(device.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
        <Pagination className="mt-3">
          {pages.map((p) => (
            <Pagination.Item
              key={p}
              active={device.page === p}
              onClick={() => {
                device.setPage(p);
              }}
            >
              {p}
            </Pagination.Item>
          ))}
        </Pagination>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default observer(DeleteDevice);
