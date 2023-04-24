import './navbar.css';
import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/button';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import { NavLink } from 'react-router-dom';
import { Context } from '../index';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchDevices } from '../http/deviceApi';
import { BsCart } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { Row } from 'react-bootstrap';

const NavBar = observer(() => {
  const { device } = useContext(Context);
  const location = useLocation();

  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    handleResize(); // initialize the state value based on the screen size
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logout = () => {
    user.setUser({});
    navigate(LOGIN_ROUTE);
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  const handleSearch = () => {
    if (device.searchInput.length === 0) {
      device.setUseFilteredDevices(false);
      return;
    }
    device.setSelectedBrand('');
    device.setSelectedType('');
    device.setUseFilteredDevices(true);

    searchDevices(device.searchInput, device.page, device.limit).then(
      (data) => {
        device.setFilteredDevices(data.rows);
        device.setTotalCount(data.count);
      }
    );
    device.setPage(1);
    const params = new URLSearchParams(location.search);
    params.set('search', device.searchInput);
    params.set('page', '1');
    navigate(`${SHOP_ROUTE}?${params.toString()}`);
  };

  return (
    <div className="navbar-container">
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink
            className="text-white text-decoration-none"
            to={SHOP_ROUTE}
            onClick={() => {
              device.setSearchInput('');
              device.setUseFilteredDevices(true);
              device.setSelectedBrand({});
              device.setSelectedType({});
            }}
          >
            <span>Device</span>
            <span className="color-shop">Shop</span>
          </NavLink>
          <Row className="d-flex mx-auto">
            <Nav className="align-items-center">
              <FormControl
                type="text"
                placeholder="Search..."
                style={{ marginLeft: '10px' }}
                className="mr-sm-2 ml-auto"
                value={device.searchInput}
                onChange={(e) => {
                  device.setSearchInput(e.target.value);
                }}
              />
              <NavLink
                className="text-white text-decoration-none"
                onClick={() => {
                  handleSearch();
                }}
              >
                <BsSearch style={{ marginLeft: '10px' }} />
              </NavLink>
            </Nav>
          </Row>
          <div className="d-flex ms-auto">
            {user.isAuth ? (
              <Nav>
                <Button
                  variant="outline-light"
                  style={{ marginRight: '10px', padding: '6px' }}
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  {isSmallScreen ? 'Admin' : 'Admin Panel'}
                </Button>
                <Button
                  className="d-flex direction-row align-items-center"
                  variant="outline-light"
                  onClick={() => logout()}
                  style={{ marginRight: '3px' }}
                >
                  Logout
                  <AiOutlineUser style={{ marginLeft: '5px' }} />
                </Button>
              </Nav>
            ) : (
              <Nav>
                <Button
                  variant="outline-light"
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  Login
                  <AiOutlineUser style={{ marginLeft: '5px' }} />
                </Button>
              </Nav>
            )}
          </div>
          <NavLink
            className="d-flex align-items-center text-white text-decoration-none"
            to="/basket"
          >
            <BsCart style={{ marginLeft: '10px' }} />
          </NavLink>
        </Container>
      </Navbar>
    </div>
  );
});

export default NavBar;
