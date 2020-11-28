const Timer = ({ startStop, reset, time, state, paused }) => {
  return (
    <div id="timer-label">
      <p>{state}</p>
      <h3 id="time-left">{time}</h3>
      <i
        className={`${paused ? 'fas fa-play' : 'fas fa-pause'} btn`}
        id="start_stop"
        onClick={startStop}
      ></i>
      <i className="fas fa-history btn" id="reset" onClick={reset}></i>
      {/* <button className="btn" id="start_stop" onClick={startStop}>
        Start
      </button> */}
      {/* <button className="btn" id="reset" onClick={reset}>
        Reset
      </button> */}
    </div>
  );
};

export default Timer;
