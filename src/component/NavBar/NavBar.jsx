import React from 'react';

import './NavBar.css';

const NavBar = ({
  filterMore,
  filterSmaller,
  filterTime,
  setVal1,
  setVal2,
  flight,
  setFlights,
  Transfer,
  noTransfer,
}) => {
  /*let sortAirline = flight.sort(
    (a, b) => a.flight.price.total.amount - b.flight.price.total.amount
  );
  console.log(sortAirline);*/

  let airline = flight.filter(
    (
      (set) => (f) =>
        !set.has(f.flight.carrier.caption) && set.add(f.flight.carrier.caption)
    )(new Set())
  );

  return (
    <div className="nav-bar">
      <div className="nav-bar__box nav-bar__sort">
        <h2 className="nav-bar__box_title">Сортировать</h2>
        <label>
          <input
            type="radio"
            id="filterPrice1"
            name="sort"
            onClick={filterMore}
            className="nav-bar__sort_elem"
          />{' '}
          - по возрастанию цены
        </label>
        <label>
          <input
            type="radio"
            id="filterPrice2"
            name="sort"
            onClick={filterSmaller}
            className="nav-bar__sort_elem"
          />{' '}
          - по убыванию цены
        </label>
        <label>
          <input
            type="radio"
            id="filterPrice3"
            name="sort"
            onClick={filterTime}
            className="nav-bar__sort_elem"
          />{' '}
          - по времени пути
        </label>
      </div>

      <div className="nav-bar__box nav-bar__filt">
        <h2 className="nav-bar__box_title">Фильтровать</h2>
        <label>
          <input
            type="checkbox"
            className="nav-bar__sort_elem"
            onClick={Transfer}
          />{' '}
          - 1 пересадка
        </label>
        <label>
          <input
            type="checkbox"
            className="nav-bar__sort_elem"
            onClick={noTransfer}
          />{' '}
          - без пересадок
        </label>
      </div>

      <div className="nav-bar__box nav-bar__price">
        <h2 className="nav-bar__box_title">Цена</h2>
        <label>
          От:
          <input
            type="number"
            className="nav-bar__price_elem"
            onChange={(e) => {
              if (e.target.value < 1) {
                setVal1(1);
              } else {
                setVal1(e.target.value);
              }
            }}
            min={100}
            max={10000000000000}
          />
        </label>
        <label>
          До:
          <input
            type="number"
            onChange={(e) => {
              if (e.target.value < 1) {
                setVal2(1000000000);
              } else {
                setVal2(e.target.value);
              }
            }}
            className="nav-bar__price_elem"
            min={100}
            max={10000000000000}
          />
        </label>
      </div>

      <div className="nav-bar__box nav-bar__filt">
        <h2 className="nav-bar__box_title">Авиакомпании</h2>
        {airline.map((item) => {
          return (
            <form key={Math.random()} id="flight">
              <input
                type="checkbox"
                className="nav-bar__sort_elem"
                value={item.flight.legs[0].segments[0].airline.caption}
                onClick={(e) => {
                  setFlights(
                    [...airline].filter((item) => {
                      return (
                        item.flight.carrier.caption.toLowerCase() ===
                        e.target.value.toLowerCase()
                      );
                    })
                  );
                }}
              />
              {item.flight.carrier.caption} от {item.flight.price.total.amount}{' '}
              р.
            </form>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
