import { Component, useEffect, useState } from 'react';
import fetchUrl from './api';
// import io from 'socket.io-client';
// const socket = io('http://localhost:5001/');


// IDEA: 
//  Make getting the username from user as one Component. Make this first. Call fetchurl hook in this component itself.
//  Make getting the chats from users as another Component.

const App = () => {

  const [message, setMessage] = useState(['Bro wtf is this?', 'Is this Working?']);
  const [chat, setChat] = useState('');

  useEffect( async () =>{
  const id = 'Akshay';
  let res = await fetch(`/negotiate?id=${id}`);
  let data = await res.json();
  const ws = new WebSocket(data.url);

  ws.onopen = (event) => {
    console.log('connected');
  };

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
  };

  ws.send(message);
},[]);

  const handleChangeChat = (e) => {
      setChat(e.target.value);
      console.log("new array after state update- ", chat);
  }

  const handleSendChat = (e) => {
    let newArr = [...message, chat];
    setChat('');
    setMessage(newArr);
    console.log("new array after state update- ", message);
}

  return (
    <div>
      <input type="text" placeholder="Enter your Message" value={chat} onChange={e => handleChangeChat(e)} />
      <button onClick={e => handleSendChat(e) }>Send Chat to everyone</button>
      {
      message.map((item, i) => {
        return (
          <div key={i}>
            <p>{item}</p>
          </div>
          )
        })
      }
    </div>
  );
  

  // return (
  //   <div style={{ display: 'flex', flexDirection: 'column', marginTop: '100px', alignItems: 'center', justifyContent: 'center'}}>
  //       <h1>Azure Web PubSub Chat</h1>
  //       <br />
  //       <input id="message" placeholder="Type to chat..." onClick={(e) => handleChangeChat(e)}/>
  //       <div id="messages"></div>
  //       <br />
  //       {
  //         message.map((chat, i) => {
  //           return(
  //           <div style={{ display: 'flex'}}>
  //           {/* <h4 id={i} style={{ marginTop: '16px', marginRight: '20px'}}><b>{chat.from}</b></h4>  */}
  //           <p>{chat.message}</p>
  //           </div>
  //           )
  //         })
  //       }
  //   </div>
  // );
}

export default App;
