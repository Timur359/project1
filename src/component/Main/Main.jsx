import React, { useEffect, useState } from 'react';
import FlightList from '../FligList/FlightList';
import NavBar from '../NavBar/NavBar';

import './Main.css';

const requestURL = 'http://localhost:3000/flights.json';

const Main = () => {
  const [flight, setFlights] = useState([]);

  const [val1, setVal1] = useState(1);
  const [val2, setVal2] = useState(1000000);

  const [airline, setAirline] = useState('');

  const sendRequest = (method, url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.responseType = 'json';

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => {
        reject(xhr.response);
      };

      xhr.send();
    });
  };

  useEffect(() => {
    sendRequest('GET', requestURL).then((data) => setFlights(data));
  }, [val1, val2]);

  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(2);

  const lastFlightIndex = currentPage * flightsPerPage;
  const currentFlight = flight.slice(0, lastFlightIndex);

  const sortPriceMore = () => {
    setFlights(
      [...flight].sort(
        (a, b) => a.flight.price.total.amount - b.flight.price.total.amount
      )
    );
  };

  const sortPriceSmaller = () => {
    setFlights(
      [...flight].sort(
        (a, b) => b.flight.price.total.amount - a.flight.price.total.amount
      )
    );
  };

  const sortPriceTime = () => {
    setFlights(
      [...flight].sort(
        (a, b) =>
          a.flight.legs[0].segments[0].travelDuration -
          b.flight.legs[0].segments[0].travelDuration
      )
    );
  };

  const costRangeFlight = [...currentFlight].filter((i) => {
    return (
      Number(i.flight.price.total.amount) >= Number(val1) &&
      Number(i.flight.price.total.amount) <= Number(val2)
    );
  });

  const nextPage = () => setCurrentPage((prev) => prev + 1);

  const handleTransfer = () => {
    setFlights(
      [...currentFlight].filter((a) => a.flight.legs[1].segments[1].stops > 0)
    );
  };

  const handleNoTransfer = () => {
    setFlights(
      [...currentFlight].filter((a) => a.flight.legs[1].segments[1].stops === 0)
    );
  };

  return (
    <div className="main">
      <NavBar
        filterMore={sortPriceMore}
        filterSmaller={sortPriceSmaller}
        filterTime={sortPriceTime}
        flight={flight}
        setVal1={setVal1}
        setVal2={setVal2}
        setSelectedFlights={setFlights}
        setAirline={setAirline}
        airline={airline}
        setFlights={setFlights}
        val2={val2}
        Transfer={handleNoTransfer}
        noTransfer={handleTransfer}
      />
      <FlightList setFlights={setFlights} flight={costRangeFlight} />
      {currentFlight.length === flight.length ||
      costRangeFlight.length === 0 ? (
        ''
      ) : (
        <button className="main__button" onClick={nextPage}>
          ???????????????? ??????
        </button>
      )}
    </div>
  );
};

export default Main;
