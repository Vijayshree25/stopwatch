import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(0); // in ms
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((t) => t + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  const addLap = () => {
    if (isRunning) setLaps([formatTime(time), ...laps]);
  };

  return (
    <div className="container">
      <div className="stopwatch-card">
        <h1>⏱ React Stopwatch</h1>
        <div className="timer">{formatTime(time)}</div>
        <div className="buttons">
          <button onClick={() => setIsRunning(true)}>Start</button>
          <button onClick={() => setIsRunning(false)}>Stop</button>
          <button
            onClick={() => {
              setTime(0);
              setIsRunning(false);
              setLaps([]);
            }}
          >
            Reset
          </button>
          <button onClick={addLap}>Lap</button>
        </div>

        {laps.length > 0 && (
          <div className="laps">
            <h3>Laps</h3>
            <ul>
              {laps.map((lap, index) => (
                <li key={index}>
                  Lap {laps.length - index}: {lap}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
