import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSomething, increaseCounter, initType } from '../store/reducers/postReducer';

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
      <button onClick={() => dispatch(getSomething(axios.get('https://jsonplaceholder.typicode.com/posts/1')))}>
        async call
      </button>
    </div>
  );
};

export default Home;
