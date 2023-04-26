import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../index';
import { BsStarFill } from 'react-icons/bs';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { fetchDevices } from '../http/deviceApi';
import { fetchOneDevice } from '../http/deviceApi';
import { updateDeviceRating } from '../http/deviceApi';

const Rating = ({ setDevicePage }) => {
  const { id } = useParams();
  const { device } = useContext(Context);

  const [rating, setRating] = useState(0);
  const [votes, setVotes] = useState(0);
  const [ratingSum, setRatingSum] = useState(0);

  const handleStarClick = (newRating) => {
    const newVotes = votes + 1;
    const newRatingSum = ratingSum + newRating;
    const newRatingAverage = Math.round(newRatingSum / newVotes);
    updateDeviceRating(id, newRatingAverage, newVotes, newRatingSum);

    setRating(newRatingAverage);
    setVotes(newVotes);
    setRatingSum(newRatingSum);

    const updatedDevices = device.devices.map((dev) => {
      if (dev.id === +id) {
        return {
          ...dev,
          rating: newRatingAverage,
        };
      }
      return dev;
    });
    device.setDevices(updatedDevices);
  };

  useEffect(() => {
    fetchOneDevice(id).then((data) => {
      setDevicePage(data);
      setRating(data.rating);
      setVotes(data.votes);
      setRatingSum(data.ratingSum);
    });
  }, [id, rating]);

  return (
    <div className="d-flex align-items-center justify-content-center mt-3">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <BsStarFill
          key={starValue}
          size={32}
          style={{ cursor: 'pointer' }}
          className={rating >= starValue ? 'text-warning' : 'text-secondary'}
          onClick={() => handleStarClick(starValue)}
        />
      ))}
      <span
        style={{
          marginLeft: '10px',
        }}
      >
        {votes > 0 ? `${votes} votes` : 'No votes'}
      </span>
    </div>
  );
};

export default observer(Rating);
