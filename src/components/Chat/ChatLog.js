import useWebChat from 'hooks/useWebChat';

const ChatLog = () => {

  const { chat } = useWebChat();
  let parsedMsgs = [];
  if (chat.length) {
    parsedMsgs = chat.map((msg) => {
      return (
        <div>
          <div>
            {msg.user}
          </div>
          <div>
            {msg.msg}
          </div>
          <div>
            {msg.date}
          </div>
        </div>);
    });
  }

  return (
    <div className='chat-container'>
      {parsedMsgs}
    </div>
  );

};

export default ChatLog;