import SetterBtn from './SetterBtn';

const Setter = ({ type, time, increment, decrement }) => {
  return (
    <div className="setterWrapper" id={`${type}-label`}>
      <SetterBtn
        className="setterBtn increment"
        id={`${type}-increment`}
        type={type}
        task={'increment'}
        action={increment}
      />
      <h3 id={`${type}-length`}>{time}</h3>
      <p>{type}</p>
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
