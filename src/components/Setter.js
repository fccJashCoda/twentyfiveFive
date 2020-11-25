import SetterBtn from './SetterBtn';

const Setter = ({ type, time, increment, decrement, foo, bar }) => {
  return (
    <div id={`${type}-label`}>
      <SetterBtn
        id={`${type}-increment`}
        type={type}
        task={'increment'}
        action={increment}
        foo={foo}
        bar={bar}
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
