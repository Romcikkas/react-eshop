import './typebar.css';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const [typeClickCount, setTypeClickCount] = useState(0);

  const selectType = (deviceType) => {
    device.setSearchInput('');
    setTypeClickCount(typeClickCount + 1);
    if (typeClickCount > 0 && deviceType.id === device.selectedType.id) {
      device.setSelectedType({});
      setTypeClickCount(0);
    } else {
      device.setSelectedType(deviceType);
    }
  };

  return (
    <ListGroup className="type-bar">
      {device.types.map((deviceType) => {
        return (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            active={deviceType.id === device.selectedType.id}
            onClick={() => selectType(deviceType)}
            key={deviceType.id}
          >
            {deviceType.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
});

export default TypeBar;
