
import React from "react";
import "./styles.scss";

//---------------------

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

//---------------------

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

//---------------------


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  };

  function del() {
    transition(DELETING)
    props.deleteInterview(props.id)
    .then( () => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}
      {mode === CREATE &&
        <Form
          name={""}
          interviewer={""}
          onCancel={() => back()}
          interviewers={props.interviewers}
          onSave={save}
        />
      }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => { }}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && (
        <Status
          message={'Saving'}
        />
      )}
      {mode === DELETING && (
        <Status
          message={'Deleting'}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Delete the appointment?'}
          onConfirm={() => del()}
          onCancel={() => back()}
        />
      )}

      {/* {props.interview ? (<Show student={props.interview.student} interviewer={props.interview.interviewer.name} />) : (<Empty />)} */}
    </article>
  )
}

//---------------------