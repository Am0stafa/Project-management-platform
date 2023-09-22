import React, { useState, useRef, useEffect } from 'react';


const ChatButton = () => {
    const [chatVisible, setChatVisible] = useState(false);
    const [messageCounterVisible, setMessageCounterVisible] = useState(true);
    const [message, setMessage] = useState('');

    const toggleChat = () => {
        setChatVisible(!chatVisible);
        setMessageCounterVisible(!messageCounterVisible);
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(message);
        setMessage(''); // Clear the message input after logging
    };

    const styles = {
      liveChat: {
          bottom: 0,
          fontSize: '12px',
          right: '24px',
          position: 'fixed',
          width: '300px'
      },
      header: {
          background: 'rgb(220 95 195)',
          borderRadius: '5px 5px 0 0',
          color: '#fff',
          cursor: 'pointer',
          padding: '16px 24px'
      },
      h4: {
          fontSize: '12px',
          margin: 0
      },
      chatClose: {
          background: 'rgb(235 171 233)',
          borderRadius: '50%',
          color: '#fff',
          display: 'block',
          float: 'right',
          fontSize: '10px',
          height: '16px',
          lineHeight: '16px',
          margin: '2px 0 0 0',
          textAlign: 'center',
          width: '16px'
      },
      chatMessageCounter: {
          background: '#e62727',
          border: '1px solid #fff',
          borderRadius: '50%',
          display: 'none',
          fontSize: '12px',
          fontWeight: 'bold',
          height: '28px',
          left: 0,
          lineHeight: '28px',
          margin: '-15px 0 0 -15px',
          position: 'absolute',
          textAlign: 'center',
          top: 0,
          width: '28px'
      },
      chat: {
          background: '#fff'
      },
      chatHistory: {
          height: '252px',
          padding: '8px 24px',
          overflowY: 'scroll'
      },
      chatMessage: {
          margin: '16px 0'
      },
      chatMessageContent: {
          marginLeft: '56px'
      },
      chatTime: {
          float: 'right',
          fontSize: '10px'
      },
      chatMessageImage: {
          borderRadius: '50%',
          float: 'left'
      },
      input: {
          border: '1px solid #ccc',
          borderRadius: '3px',
          padding: '8px',
          outline: 'none',
          width: '234px'
      },
      fieldset: {
          border: 0,
          margin: 0,
          padding: 0
      }
  };

  return (
    <div id="live-chat" style={styles.liveChat}>
        <header className="clearfix" style={styles.header} onClick={toggleChat}>
            <a href="#" className="chat-close" style={styles.chatClose} onClick={e => e.preventDefault()}>x</a>
            <h4>Team chat</h4>
            {messageCounterVisible && (
                <span className="chat-message-counter" style={styles.chatMessageCounter}>3</span>
            )}
        </header>

        {chatVisible && (
            <div className="chat" style={styles.chat}>
                <div className="chat-history" style={styles.chatHistory}>
                    <div className="chat-message clearfix" style={styles.chatMessage}>
                        <img src="http://lorempixum.com/32/32/people" alt="" width="32" height="32" style={styles.chatMessageImage} />
                        <div className="chat-message-content clearfix" style={styles.chatMessageContent}>
                            <span className="chat-time" style={styles.chatTime}>13:35</span>
                            <h5>John Doe</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, explicabo quasi ratione odio dolorum harum.</p>
                        </div>
                        <hr />
                    </div>

                    <div className="chat-message clearfix" style={styles.chatMessage}>
                        <img src="http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f320?s=32" alt="" width="32" height="32" style={styles.chatMessageImage} />
                        <div className="chat-message-content clearfix" style={styles.chatMessageContent}>
                            <span className="chat-time" style={styles.chatTime}>13:37</span>
                            <h5>Marco Biedermann</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>
                        </div>
                        <hr />
                    </div>

                    <div className="chat-message clearfix" style={styles.chatMessage}>
                        <img src="http://lorempixum.com/32/32/people" alt="" width="32" height="32" style={styles.chatMessageImage} />
                        <div className="chat-message-content clearfix" style={styles.chatMessageContent}>
                            <span className="chat-time" style={styles.chatTime}>13:38</span>
                            <h5>John Doe</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                        </div>
                        <hr />
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <fieldset style={styles.fieldset}>
                        <input 
                            type="text"
                            value={message}
                            onChange={handleChange}
                            placeholder="send a message" 
                            autoFocus 
                            style={styles.input} 
                        />
                    </fieldset>
                </form>
            </div>
        )}
    </div>
);
};

export default ChatButton;
