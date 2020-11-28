const SetterBtn = ({ id, type, task, action }) => {
  console.log('setter type', type);
  console.log('setter task', task);
  return (
    <>
      <i
        className={`${
          task === 'increment' ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
        } setterBtn ${task}`}
        onClick={() => action(type)}
        id={id}
      ></i>
    </>
  );
};

export default SetterBtn;
