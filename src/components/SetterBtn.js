const SetterBtn = ({ id, type, task, action, foo, bar }) => {
  return (
    <button
      id={id}
      // onClick={() => action(type)}
      // onClick={() => foo()}
      onMouseDown={foo}
      onMouseUp={bar}
    >
      {task}
    </button>
  );
};

export default SetterBtn;
