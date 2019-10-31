

import React, { useState, useEffect, useReducer } from "react";

//--------------------------------

import "components/Application.scss";
import axios from "axios";
//-------------

export default function useApplicationData() {


  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value }
      case SET_APPLICATION_DATA:
        console.log("set-application type")
        return { ...state, ...action.value }
      case SET_INTERVIEW: {
        return { ...state, appointments: action.value }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  // let [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // })


  let [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  //--------------------------------
  useEffect(() => {
  axios.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
  ])
    .then((all) => {
      dispatch({
        type: "SET_APPLICATION_DATA",
        value: {days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data}

      })
    })
    
    // .then(resp => setDays(resp.data)) //setState({...state, days: resp.data})) 
    // .then(setTimeout(() => console.log(state), 4000))
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  }, [])
  // console.log('state in useApp is', state)

  //-------------

  const setDay = day => dispatch({
    type: "SET_DAY",
    value: day
  });

  //-------------

  function bookInterview(id, interview) {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(resp => {
        const intvw = { ...interview };

        const appointment = {
          ...state.appointments[id],
          interview: { ...intvw }
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        dispatch({
          type: "SET_INTERVIEW",
          value: appointments
        })
      })
  }

  //-------------

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(resp => {
        const interview = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: interview
        };

        dispatch({
          type: "SET_INTERVIEW",
          value: appointments
        })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview: deleteInterview
  }
}
