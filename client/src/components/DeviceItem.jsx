import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png';
import { useNavigate } from 'react-router-dom';
import Rating from 'react-rating';
import { Context } from '../index';
import { useContext } from 'react';

const DeviceItem = (props) => {
  const navigate = useNavigate();
  const { device } = useContext(Context);

  return (
    <Col md={3} className="mt-3">
      <Card
        className="border-light shadow-sm"
        style={{ width: 150, cursor: 'pointer' }}
        onClick={() => navigate(`/device/${props.device.id}`)}
      >
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + props.device.img}
          alt="Card image cap"
        />
        <div className="text-black-50 d-flex justify-content-between mt-1 align-items-center">
          <div>
            {
              device.brands.filter(
                (brand) => brand.id === props.device.brandId
              )[0].name
            }
          </div>
          <div className="d-flex align-items-center">
            <div>{props.device.rating}</div>
            <Image src={star} width={14} height={14} />
          </div>
        </div>
        <div>{props.device.name}</div>
        <div
          style={{
            marginTop: '10px',
            fontSize: '14px',
          }}
        >
          Price: {props.device.price} Eur
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
