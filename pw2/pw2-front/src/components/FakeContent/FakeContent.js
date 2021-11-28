import { useState } from 'react';
import './FakeContent.css'

function FakeContent() {

  const randomValue = Math.random() * 100;
  const [ random, setRandom ] = useState(randomValue);

  const handleClick = () => {
    setRandom(Math.random() * 100);
  }

  return (
    <div className="container-fluid mt-2">
      <div>{random}</div>
      <button onClick={handleClick} type="button" className="btn btn-primary">Clique me!</button>
    </div>
  )
}


export default FakeContent
