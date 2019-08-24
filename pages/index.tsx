import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Nav from '../components/nav';

interface HomeProps {
}

const Home: React.FC<HomeProps> = () => {

  const [count, setCount] = useState(10);

  return (
    <div>
      <h1>hello world</h1>
      <p>count {count} !!</p>
      <button onClick={() => setCount(count + 1)}>
        increase
      </button>
    </div>
  );
};

export default Home;
