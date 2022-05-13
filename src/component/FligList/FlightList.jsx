import React from 'react';
import Flight from '../Flight/Flight';

import './FlightList.css';

const FlightList = ({ flight }) => {
  return (
    <div className="flight-list">
      {flight.length === 0 ? (
        <h1>По заданным параметрам рейсы отсутствуют</h1>
      ) : (
        flight.map((item) => {
          return <Flight key={item.flightToken} flight={item.flight} />;
        })
      )}
    </div>
  );
};

export default FlightList;
