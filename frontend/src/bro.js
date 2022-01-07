import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// const socket = io('http://localhost:5001/');

const App = () => {

  const [message, setMessage]=useState([{from: 'programmer', message: 'bro what is this?'}]);
  const [userName, setUsername]=useState('');

  // let ws = new WebSocket();  // creating a websocket with the url sent from azure web pubsub server

  useEffect(() =>{
    const fetchData = async () => {
      setUsername(prompt('enter your name'));
      let res = await fetch(`/negotiate?id=${userName}`);
      let data = await res.json();
      let ws = new WebSocket(data.url);  // creating a websocket with the url sent from azure web pubsub server
      ws.addEventListener('open', (event) => {
        console.log('connected');
      });
      ws.addEventListener('message',(event) => {
        let data = JSON.parse(event.data);
        // m.innerText = `[${data.type || ''}${data.from || ''}] ${data.message}`;
        const newMessage = { from: data.from, message: data.message};
        setMessage(...message, newMessage);
      });
    }
    fetchData();
  }, []);

  // useEffect( async () => {
  //   ws.addEventListener('message',(event) => {
  //     let data = JSON.parse(event.data);
  //     // m.innerText = `[${data.type || ''}${data.from || ''}] ${data.message}`;
  //     const newMessage = { from: data.from, message: data.message};
  //     setMessage(...message, newMessage);
  //   });
    
  // }, [message, setMessage, userName, setUsername]);

  const sendMessage = (e) => {
    if (e.charCode !== 13) return;
    // ws.send(message.message.value);
    const newMessage = { message: e.target.value};
    setMessage(...message, newMessage);
    message.message.value = '';
  }

  return (
    <div style={{ display: 'flex', marginTop: '100px', alignItems: 'center', justifyContent: 'center'}}>
        <h1>Azure Web PubSub Chat</h1>
        <input id="message" placeholder="Type to chat..." onKeyPressCapture={(e) => sendMessage(e)}/>
        <div id="messages"></div>
        <br />
        {
          message.map((chat, i) => {
            <>
            <h4 id={i}><b>{chat.from}</b></h4> : <h5>{chat.message}</h5>
            </>
          })
        }
    </div>
  );
}

export default App;
