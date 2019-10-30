import React, { useState, useEffect } from "react";
//------------------

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  function transition(next, replace = false) {
    if (replace) {
      setMode(next)
      history.splice(history.length-1, 1, next)
    } else {
      setMode(next)
      setHistory([...history, next])
    }
  };

  function back() {
    if (history.length === 1) {
      setMode(history[0])
    } else {
      history.pop()
      setMode(history[history.length - 1])
    }
  };
  return {
    mode,
    transition,
    back
  }
}


//------------------
