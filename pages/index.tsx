import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseCounter, initType } from '../store/reducers/postReducer';

interface HomeProps {
}

export type RootState = {
  postReducer: initType;
};


const Home: React.FC<HomeProps> = () => {

  const counter: number = useSelector((state: RootState) => state.postReducer.counter);
  const dispatch = useDispatch();

  const [count, setCount] = useState(10);

  return (
    <div>
      <h1>hello world</h1>
      <p>counter {counter}</p>
      <p>count {count} !!</p>
      <button onClick={() => setCount(count + 1)}>
        increase
      </button>
      <button onClick={() => dispatch(increaseCounter(3))}>
        increase reducer counter
      </button>
    </div>
  );
};

export default Home;
