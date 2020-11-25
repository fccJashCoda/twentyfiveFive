import SetterBtn from './SetterBtn';

const Setter = ({ type, time, increment, decrement }) => {
  return (
    <div id={`${type}-label`}>
      <SetterBtn
        id={`${type}-increment`}
        type={type}
        task={'increment'}
        action={increment}
      />
      <h3 id={`${type}-length`}>{time}</h3>
      <SetterBtn
        id={`${type}-decrement`}
        type={type}
        task={'decrement'}
        action={decrement}
      />
    </div>
  );
};

export default Setter;
