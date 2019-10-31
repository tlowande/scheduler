import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
// import classNames from 'classnames/bind';

export default function InterviewerList(props) {
  const list = props.interviewers.map(person => {
    return (<InterviewerListItem
      key={person.id}
      name={person.name}
      avatar={person.avatar}
      selected={person.id === props.value}
      handleClick={() => {
        props.onChange(person.id)
      }} />)
  })
 
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>)
}

