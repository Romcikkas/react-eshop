import React, { useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react';

const Basket = () => {
  const { device } = useContext(Context);

  const handlerRemove = (id) => {
    device.setBasketDevices(
      device.basketDevices.filter((item) => item.id !== id)
    );
  };

  const handleCheckout = () => {
    console.log('Checkout clicked');
  };

  return (
    <div>
      <h2 className="d-flex align-items-center justify-content-center mt-2">
        Basket
      </h2>
      <ul>
        {device.basketDevices.map((item, idx) => (
          <li
            key={idx}
            className="d-flex align-items-center justify-content-between my-2"
          >
            <div className="d-flex align-items-center">
              <input type="checkbox" className="mr-2" />
              <img
                src={process.env.REACT_APP_API_URL + item.img}
                alt={item.name}
                className="mr-2"
                style={{ maxWidth: '50px', maxHeight: '50px' }}
              />
              <div>
                <div>{item.name}</div>
                <div>{item.price} Eur</div>
              </div>
            </div>
            <button
              className="btn btn-danger mr8px"
              onClick={() => handlerRemove(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-end mt-5">
        {!!device.basketDevices.length && (
          <button className="btn btn-primary mr8px" onClick={handleCheckout}>
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default observer(Basket);
