import React, { useContext, useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react';

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  const [brandClickCount, setBrandClickCount] = useState(0);

  const selectBrand = (deviceBrand) => {
    device.setSearchInput('');
    setBrandClickCount(brandClickCount + 1);
    if (brandClickCount > 0 && deviceBrand.id === device.selectedBrand.id) {
      device.setSelectedBrand({});
      setBrandClickCount(0);
    } else {
      device.setSelectedBrand(deviceBrand);
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-between">
        {device.brands.map((brand) => {
          return (
            <Card
              style={{ cursor: 'pointer' }}
              onClick={() => selectBrand(brand)}
              border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
              className="p-2 w-auto my-md-0 my-2 mr8px"
              key={brand.id}
            >
              {brand.name}
            </Card>
          );
        })}
      </Row>
    </Container>
  );
});

export default BrandBar;
