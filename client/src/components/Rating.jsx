import React, { useContext } from 'react';
import { Context } from '../index';
import { BsStarFill, BsStar } from 'react-icons/bs';

const Rating = () => {
  const { device } = useContext(Context);

  const handleStarClick = (newRating) => {
    device.setRating(newRating);
    // onRatingChange && onRatingChange(newRating);
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-3">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <BsStarFill
          key={starValue}
          size={32}
          style={{ cursor: 'pointer' }}
          className={
            device.rating >= starValue ? 'text-warning' : 'text-secondary'
          }
          onClick={() => handleStarClick(starValue)}
        />
      ))}
    </div>
  );
};

export default Rating;
