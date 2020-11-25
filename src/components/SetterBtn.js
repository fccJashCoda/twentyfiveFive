import { useState, useEffect } from 'react';

const SetterBtn = ({ id, type, task, action }) => {
  const [mouseDown, setMouseDown] = useState(false);

  const handleMouseDown = () => setMouseDown(!mouseDown);

  useEffect(() => {
    let timer;

    const loop = (time) => {
      timer = setTimeout(() => {
        time = time > 100 ? time - 100 : time;
        action(type);
        loop(time);
      }, time);
    };

    if (mouseDown) {
      timer = setTimeout(() => {
        action(type);
        loop(500);
      });

      return () => clearTimeout(timer);
    }
  }, [mouseDown]);

  return (
    <button id={id} onMouseDown={handleMouseDown} onMouseUp={handleMouseDown}>
      {task}
    </button>
  );
};

export default SetterBtn;
