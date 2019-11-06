import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

import { useEffect, useReducer } from "react";

//--------------------------------

import "components/Application.scss";
import axios from "axios";
//-------------

export default function useApplicationData() {


  const checkDay = (id) => {
    let dayID = null;
    for (const obj of state.days) {
      if (obj.appointments.includes(id)) {
        dayID = obj.id;
      }
    }
    return dayID;
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
      .catch((error) => {
        console.error(error.response.status);
        console.error(error.response.headers);
        console.error(error.response.data);
      });
  }, [])

  //-------------

  const setDay = day => dispatch({
    type: "SET_DAY",
    value: day
  });

  //-------------

  function bookInterview(id, interview, create = false) {
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


        const days = state.days.map(day => {
          return (create ? day.id === checkDay(id) ? { ...day, spots: day.spots - 1 } : { ...day } : { ...day })
        });

        dispatch({
          type: "SET_INTERVIEW",
          appointments,
          days
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

        const days = state.days.map(day => {
          return (day.id === checkDay(id) ? { ...day, spots: day.spots + 1 } : { ...day })
        });

        dispatch({
          type: "SET_INTERVIEW",
          appointments,
          days
        })
      })
  }

  // useEffect(() => {

  //   async function fetchData() {
  //     let resp = await axios.get("http://localhost:8001/api/days");
  //     dispatch({ type: "SET_SPOTS", value: resp.data })
  //   }

  //   fetchData();
  //   // axios.get("http://localhost:8001/api/days")
  //   //   .then(resp => {
  //   //     dispatch({ type: "SET_SPOTS", value: resp.data })
  //   //   })
  // }, [state.appointments])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview: deleteInterview
  }
}
