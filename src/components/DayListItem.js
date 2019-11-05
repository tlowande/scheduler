import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames/bind';

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots) === 0

  })

  const formatSpots = number => {
    // eslint-disable-next-line
    let formattedText
    if(number === 1){
      return formattedText = `${number} spot remaining`
    }
    if(number > 0 ){
      return formattedText = `${number} spots remaining`
    }
    return formattedText = `no spots remaining`
  }

  return (
    <li 
    className={dayClass} 
    onClick={props.setDay} 
    data-testid="day"
    >
      <h2 className="text--regular"> {props.name} </h2>
      <h3 className="text--light"> {formatSpots(props.spots)} </h3>
    </li>
  );
}