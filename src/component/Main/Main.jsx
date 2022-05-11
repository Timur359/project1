import React, { useEffect, useState, useRef } from 'react';
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

  const costRangeFlight = [...flight].filter((i) => {
    return (
      Number(i.flight.price.total.amount) >= Number(val1) &&
      Number(i.flight.price.total.amount) <= Number(val2)
    );
  });

  /*useEffect(() => {
    var callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
        setFlights([...flight]);
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, []);
  const lastElement = useRef();
  const observer = useRef();*/

  return (
    <div className="main">
      <NavBar
        filterMore={sortPriceMore}
        filterSmaller={sortPriceSmaller}
        filterTime={sortPriceTime}
        flight={val1 >= 0 ? costRangeFlight : flight}
        setVal1={setVal1}
        setVal2={setVal2}
        setSelectedFlights={setFlights}
        setAirline={setAirline}
        airline={airline}
        setFlights={setFlights}
        val2={val2}
      />
      <FlightList
        setFlights={setFlights}
        flight={val1 >= 0 ? costRangeFlight : flight}
      />
      <div
        //ref={lastElement}
        style={{ height: 20, background: 'red', width: 800 }}
      />
    </div>
  );
};

export default Main;
