import {useEffect, useState} from 'react';
import axios from 'axios';
const useWebChat = () => {
  const [chat, setChat] = useState([])

  useEffect(() => { // on mount - add websocket listener to trigger render on update
    const baseURL = process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8001';
    const socket = new WebSocket(baseURL);
    socket.onopen = () => {
      socket.send('ping');
    };
    socket.addEventListener('message', function (event) {
      const update = JSON.parse(event.data);
      if (update.type) { // check type of parsed message to filter messages
        const { type, msg, user } = update;
        axios.get('api/days')
          .then(data => setChat(prev => [...prev, {msg, user, date: new Date()}]))
          .catch(er => console.log(er));
      }
    });
    return () => socket.close();
  }, []);

  return {
    chat
  }

}
export default useWebChat;