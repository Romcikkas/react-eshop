import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { Row, Col } from 'react-bootstrap';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex ms-auto mt-4">
      {device.devices.map((device) => {
        return (
          <Col key={device.id} xs={6} md={6} lg={3}>
            <DeviceItem device={device} />
          </Col>
        );
      })}
    </Row>
  );
});

export default DeviceList;
