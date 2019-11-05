

import { useEffect, useReducer } from "react";

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
        return { ...state, ...action.value }
      case SET_INTERVIEW: {
        return { ...state, appointments: action.value }
      }
      case "SET_SPOTS": {
        return { ...state, days: action.value }
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

    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
      .then((all) => {
        dispatch({
          type: "SET_APPLICATION_DATA",
          value: {
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }

        })
      })

      // .then(resp => setDays(resp.data)) //setState({...state, days: resp.data})) 
      // .then(setTimeout(() => console.log(state), 4000))
      .catch((error) => {
        console.error(error.response.status);
        console.error(error.response.headers);
        console.error(error.response.data);
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

  useEffect(() => {

    async function fetchData() {
      let resp = await axios.get("http://localhost:8001/api/days");
      dispatch({ type: "SET_SPOTS", value: resp.data })
    }

    fetchData();
    // axios.get("http://localhost:8001/api/days")
    //   .then(resp => {
    //     console.log(resp.data)
    //     dispatch({ type: "SET_SPOTS", value: resp.data })
    //   })
  }, [state.appointments])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview: deleteInterview
  }
}
