import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import star from '../assets/star_big.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceApi';
import Rating from '../components/Rating';
import { Context } from '../index';
import { observer } from 'mobx-react';

const DevicePage = () => {
  const { device } = useContext(Context);
  const [deviceState, setDeviceState] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDeviceState(data));
  }, []);

  const addToCard = (id) => {
    device.devices.map((d) => {
      if (d.id === +id) {
        device.setBasketDevices([...device.basketDevices, d]);
      }
    });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4} className=" d-flex justify-content-center">
          <Image
            width={240}
            height={240}
            src={process.env.REACT_APP_API_URL + deviceState.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2 className="d-flex justify-content-center mt-3 mt-md-0">
              {deviceState.name}
            </h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${star}) no-repeat center center`,
                width: 200,
                height: 200,
                fontSize: 50,
                backgroundSize: 'cover',
              }}
            >
              {deviceState.rating > 0 ? deviceState.rating : ''}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex justify-content-around align-items-center flex-column p-1 mt-3 mb-4 mt-md-0 mb-md-0"
            style={{
              maxWidth: '290px',
              height: '245px',
              margin: '0 auto',
              fontSize: '32px',
              border: '2px solid lightgray',
            }}
          >
            <h3>Price: {deviceState.price} Eur</h3>
            <Button variant="outline-dark" onClick={() => addToCard(id)}>
              Add to cart
            </Button>
          </Card>
        </Col>
      </Row>
      <Rating setDevicePage={setDeviceState} />
      <Row className="d-flex justify-content-center mt-5">
        <Row>
          <h1 className="mb-4 px-1">Specifications:</h1>
        </Row>
        {deviceState.info.map((d) => (
          <Row
            key={d.id}
            style={{
              background: d.id % 2 !== 0 && 'lightgray',
              padding: 5,
            }}
          >
            <h3 style={{ fontSize: 18 }}>{d.title}: </h3>
            <div>{d.description}</div>
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default observer(DevicePage);
