import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { , initType } from '../store/reducers/postReducer';

interface HomeProps {
}

export type RootState = {
  postReducer: initType;
};


const Home: React.FC<HomeProps> = () => {

  const counter: number = useSelector((state: RootState) => state.postReducer.counter);


  const [count, setCount] = useState(10);

  return (
    <div>
      <h1>hello world</h1>
      <p>counter {counter}</p>
      <p>count {count} !!</p>
      <button onClick={() => setCount(count + 1)}>
        increase
      </button>
    </div>
  );
};

export default Home;
