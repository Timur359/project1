import React from 'react';

import './Flight.css';

import img from '../../images/clock.png';

const Flight = ({ flight }) => {
  const setTime = (flight, n) => {
    let hours = Math.trunc(flight.legs[n].segments[n].travelDuration / 60);
    let minutes = flight.legs[n].segments[n].travelDuration % 60;
    return hours + ' ч ' + minutes + ' мин';
  };

  const departureTime = (flight, n) => {
    return new Date(flight.legs[n].segments[n].departureDate)
      .toLocaleTimeString()
      .toString();
  };

  return (
    <div className="flight">
      <div className="flight__header">
        <div className="flight__header_icon"></div>
        <div className="flight__header_sum">
          {flight.price.total.amount} {flight.price.total.currency}
        </div>
        <span className="flight__header_text">
          Стоимость для одного взрослого пассажира
        </span>
      </div>
      {console.log(flight.legs[0])}
      <h2 className="flight__title">
        {flight.legs[0].segments[0].departureCity.caption},{' '}
        {flight.legs[0].segments[0].departureAirport.caption}
        <span className="flight__title_span">({flight.carrier.uid})</span>{' '}
        <span className="flight__title_span">&#8594;</span>{' '}
        {flight.legs[0].segments[0].arrivalCity.caption},{' '}
        {flight.legs[0].segments[0].arrivalAirport.caption}
        <span className="flight__title_span">({flight.carrier.uid})</span>
      </h2>
      <div className="flight__info-box">
        <p className="flight__info-box_time">
          {departureTime(flight, 0)}
          <span className="flight__info-box_date">
            {new Date(flight.legs[0].segments[0].departureDate)
              .toDateString()
              .toString()}
          </span>
        </p>
        <p className="flight__info-box_total-time">
          <img className="flight__info-box_img" src={img} />
          {setTime(flight, 0)}
        </p>
        <p className="flight__info-box_time">
          <span className="flight__info-box_date">
            {new Date(flight.legs[0].segments[0].arrivalDate)
              .toDateString()
              .toString()}
          </span>
          {new Date(flight.legs[0].segments[0].arrivalDate)
            .toLocaleTimeString()
            .toString()}
        </p>
        <div className="flight__info-box_transplants">
          <p className="flight__info-box_span">
            {flight.legs[0].segments[0].stops} пересадок(-ка)
          </p>
        </div>
      </div>
      <p className="flight__airplane">
        Рейс выполняет: {flight.carrier.caption}
      </p>
      <div className="flight__border" />
      <h2 className="flight__title">
        {' '}
        {flight.legs[1].segments[1].departureCity.caption},{' '}
        {flight.legs[1].segments[1].departureAirport.caption}
        <span className="flight__title_span">({flight.carrier.uid})</span>{' '}
        <span className="flight__title_span">&#8594;</span>{' '}
        {flight.legs[1].segments[1].arrivalCity.caption},{' '}
        {flight.legs[1].segments[1].arrivalAirport.caption}
        <span className="flight__title_span">({flight.carrier.uid})</span>
      </h2>
      <div className="flight__info-box">
        <p className="flight__info-box_time">
          {new Date(flight.legs[1].segments[1].departureDate)
            .toLocaleTimeString()
            .toString()}
          <span className="flight__info-box_date">
            {new Date(flight.legs[1].segments[1].departureDate)
              .toDateString()
              .toString()}
          </span>
        </p>
        <p className="flight__info-box_total-time">
          <img className="flight__info-box_img" src={img} />
          {setTime(flight, 1)}
        </p>
        <p className="flight__info-box_time">
          <span className="flight__info-box_date">
            {new Date(flight.legs[1].segments[1].arrivalDate)
              .toDateString()
              .toString()}
          </span>
          {new Date(flight.legs[1].segments[1].arrivalDate)
            .toLocaleTimeString()
            .toString()}
        </p>
        <div className="flight__info-box_transplants">
          <p className="flight__info-box_span">
            {flight.legs[1].segments[1].stops} пересадок(-ка)
          </p>
        </div>
      </div>
      <p className="flight__airplane">
        Рейс выполняет:{flight.carrier.caption}
      </p>
      <button className="flight__select-button">Выбрать</button>
    </div>
  );
};

export default Flight;
