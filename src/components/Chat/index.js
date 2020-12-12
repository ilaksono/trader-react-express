import ChatLog from './ChatLog';
import { useState } from 'react';

const Chat = () => {
  const [chatTxt, setChatTxt] = useState('');


  return (
    <>
      <ChatLog />
      <input
        onChange={event =>
          setChatTxt(event.target.value)}
        value={chatTxt}
      />
    </>
  );
};

export default Chat;