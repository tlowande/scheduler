
import React from "react";
import "./styles.scss";

//---------------------

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Error from "./Error";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

//---------------------

const EMPTY = "EMPTY";
const EDIT = "EDIT";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "EROR_DELETE";

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
      .catch((error) => {
        transition(ERROR_SAVE, true)
      });
  };

  function del() {
    transition(DELETING, true)
    props.deleteInterview(props.id)
    .then( () => transition(EMPTY))
    .catch((error) => {
      transition(ERROR_DELETE, true)
    });
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
      {mode === EDIT &&
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          interviewers={props.interviewers}
          onSave={save}
        />
      }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => transition(EDIT)}
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
       {mode === ERROR_SAVE && (
        <Error
          message={'Could not save appointment'}
          onClose={() => back()}
        />
      )}
       {mode === ERROR_DELETE && (
        <Error
          message={'Could not delete appointment'}
          onClose={() => back()}
        />
      )}

      {/* {props.interview ? (<Show student={props.interview.student} interviewer={props.interview.interviewer.name} />) : (<Empty />)} */}
    </article>
  )
}

//---------------------