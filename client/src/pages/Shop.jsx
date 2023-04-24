import DeviceList from '../components/DeviceList';
import BrandBar from '../components/BrandBar';
import TypeBar from '../components/TypeBar';
import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { Context } from '../index';
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceApi';
import Pages from '../components/Pages';
import { searchDevices } from '../http/deviceApi';

const Shop = () => {
  const { device } = useContext(Context);

  useEffect(() => {
    if (device.searchInput.length !== 0) {
      device.setSelectedType({});
      device.setSelectedBrand({});
    }
  }, [device.searchInput === '']);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  useEffect(() => {
    if (device.searchInput.length === 0) {
      device.setUseFilteredDevices(false);
      fetchDevices(
        device.selectedType.id,
        device.selectedBrand.id,
        device.page,
        device.limit
      ).then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    } else if (device.searchInput.length !== 0 && device.useFilteredDevices) {
      searchDevices(device.searchInput, device.page, device.limit).then(
        (data) => {
          device.setFilteredDevices(data.rows);
          device.setTotalCount(data.count);
        }
      );
    }
  }, [
    device.page,
    device.selectedType,
    device.selectedBrand,
    device.useFilteredDevices,
    device.searchInput === '',
  ]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
};

export default observer(Shop);
