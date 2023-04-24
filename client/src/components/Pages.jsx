import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Context } from '../index';
import { Pagination } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';

const Pages = () => {
  const { device } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const pageCount = Math.ceil(device.totalCount / device.limit);

  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {pages.map((p) => (
        <Pagination.Item
          key={p}
          active={device.page === p}
          onClick={() => {
            {
              device.setPage(p);
            }
            params.set('search', device.searchInput);
            params.set('page', p.toString());
            {
              device.searchInput && device.useFilteredDevices
                ? navigate(`${SHOP_ROUTE}?${params.toString()}`)
                : navigate(`${SHOP_ROUTE}`);
            }
          }}
        >
          {p}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default observer(Pages);

// onClick={() => {
//   {
//     device.setPage(p);
//   }
//   params.set('search', device.searchInput);
//   params.set('page', p.toString());
//   {
//     device.searchInput
//       ? navigate(`${SHOP_ROUTE}?${params.toString()}`)
//       : navigate(`${SHOP_ROUTE}`);
//   }
// }}
