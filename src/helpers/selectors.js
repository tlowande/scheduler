
function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(d => d.name === day);
  if (filteredDay === undefined) {
    return []
  } else {
    const detailedAppointments = filteredDay.appointments.map(id => state.appointments[id])
    return detailedAppointments
  }
}

function getInterviewersForDay(state, day) {

  const filteredDay = state.days.filter(d => d.name === day);

  const dayInterviewers = filteredDay[0]

  if (dayInterviewers === undefined || dayInterviewers.length === 0) {
    return []
  } else {
    const detailedInterviewers = dayInterviewers.interviewers.map(id => state.interviewers[id])
    return detailedInterviewers
  }
}

function getInterview(state, interview) {
  if (!interview) return null;
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]

  }
}
export {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
}
