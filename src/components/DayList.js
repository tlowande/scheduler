import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const list = props.days.map(day => {
    return (<DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day} //props.value
      setDay={() => props.setDay(day.name)} />)
  })

  return (<ul>{list}</ul>)
}