import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5001/');

function App() {

  const [message, setMessage]=useState([]);
  
  useEffect(() => {

}, []);

  return (
    <div style={{ display: 'flex', marginTop: '100px', alignItems: 'center', justifyContent: 'center'}}>
        Akshay
        <br />
        {message}
    </div>
  );
}

export default App;
