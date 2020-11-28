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
      <div>
        <h3 id={`${type}-length`}>{time}</h3>
        <p>{type}</p>
      </div>
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
