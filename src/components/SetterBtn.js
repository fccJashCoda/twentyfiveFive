import { useState, useEffect } from 'react';

const SetterBtn = ({ id, type, task, action }) => {
  return (
    <button id={id} onClick={() => action(type)}>
      {task}
    </button>
  );
};

export default SetterBtn;
