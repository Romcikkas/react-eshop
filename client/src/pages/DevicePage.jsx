import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import iphone from '../assets/iphone.jpg';
import star from '../assets/star_big.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceApi';
import Rating from '../components/Rating';
// import Rating from 'react-rating';

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });

  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4} className=" d-flex justify-content-center">
          <Image width={240} height={240} src={iphone} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2 className="d-flex justify-content-center mt-3 mt-md-0">
              {device.name}
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
              {device.rating}
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
            <h3>From: {device.price} Eur</h3>
            <Button variant="outline-dark">Add to cart</Button>
          </Card>
        </Col>
      </Row>
      <Rating />
      <Row className="d-flex justify-content-center mt-5">
        <Row>
          <h1 className="mb-4 px-1">Specifications:</h1>
        </Row>
        {device.info.map((d) => (
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

export default DevicePage;
