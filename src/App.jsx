import { useEffect, useState, useRef  } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { databases,client } from "./appwrite";
import Chats from './components/Chats';
import Conver from './components/Conver';
import CostumInput from './components/CostumInput';

const API_KEY = "";
const systemMessage = { 
  "role": "system", "content": "explain like i am 5 years old"
}


function App() { 
  
  const [activeChat, setActiveChat] = useState('');
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([
    {
      message: "",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    const createNewChat = databases.createDocument('6579d220a1154d2abb07', '6579d2392bc4dbab9899', '',{name :'new chat'});
    const getId =  databases.listDocuments('6579d220a1154d2abb07', '6579d2392bc4dbab9899');
    const Conver = databases.listDocuments('6579d220a1154d2abb07', '6579d253a86299761872');
     // Success
    getId.then( res => {
      const i = res.documents[res.documents.length - 1].$id
      setActiveChat(i)
  }, function (error) {
      console.log(error);
  });
  
  const getChats = databases.listDocuments('6579d220a1154d2abb07', '6579d2392bc4dbab9899');
    getChats.then(res => {
      setChats(res.documents);
    }, error => {
      console.log(error);
    });
  }, []);
  const NewChat = () => {

    const createNewChat = databases.createDocument('6579d220a1154d2abb07', '6579d2392bc4dbab9899', '',{name :'new chat'});
    const getId =  databases.listDocuments('6579d220a1154d2abb07', '6579d2392bc4dbab9899');
    const Conver = databases.listDocuments('6579d220a1154d2abb07', '6579d253a86299761872');
     // Success
    getId.then( res => {
      const i = res.documents[res.documents.length - 1].$id
      setActiveChat(i)
      setMessages([
        {
          message: "",
          sentTime: "just now",
          sender: "ChatGPT"
        }
      ]);
  }, function (error) {
      console.log(error); // Failure
  });
  
  const getChats = databases.listDocuments('6579d220a1154d2abb07', '6579d2392bc4dbab9899');
    getChats.then(res => {
      setChats(res.documents);
      console.log("chats :",chats);
    }, error => {
      console.log(error);
    });
  }
  const handleChatClick = (chatId) => {
    console.log(messages);
    setActiveChat(chatId.$id);
    let Conver = databases.listDocuments('6579d220a1154d2abb07', '6579d253a86299761872');
Conver.then(res => {
  Conver = res.documents;
  const check = res.documents.filter((message) => message.chats && message.chats.$id === chatId.$id)
  setMessages(check);
});
  };
  useEffect(() => {
    const promise = databases.listDocuments('6579d220a1154d2abb07', '6579d253a86299761872');
  promise.then( res => {
      // console.log(res.documents); // Success
  }, function (error) {
      console.log(error); // Failure
  });
    console.log("messages",messages);
  }, [messages]);
  const [isTyping, setIsTyping] = useState(false);
  const activeChatRef = useRef(activeChat);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);
  const handleSend = async (message) => {
    const newMessage = {
      message:message,
      direction: 'outgoing',
      sender: "user",
      chats: activeChatRef.current
    };
    console.log("activeChat",activeChat);
    const insert = databases.createDocument('6579d220a1154d2abb07', '6579d253a86299761872', '', newMessage);
    insert.then(function (response) {
      console.log(response); // Success
  }, function (error) {
      console.log(error); // Failure
  });
  let newMessages;
    if (!messages[0] || !messages[0].message)
        newMessages = [newMessage];
    else
        newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });
  
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  
        ...apiMessages
      ]
    }
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });
  
      const data = await response.json();
      console.log("API Response:", data);
      let answer;
      if (data.choices && data.choices[0]) {
        answer = {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
          chats : activeChat
        };
        const insertAnswer = databases.createDocument('6579d220a1154d2abb07', '6579d253a86299761872', '', answer);

        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
      } else {
        console.error('No choices returned from API');
      }
      setIsTyping(false);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setIsTyping(false);
    }
  }
  return (
    <div className="App">
      <Chats messages={messages} chats={chats} handleChatClick={handleChatClick} NewChat={NewChat}/>
       <>
      <div className='conversation'>
      <Conver ref={messagesEndRef} isTyping={isTyping} messages={messages}/>
      <CostumInput placeholder="Message chatGPT..." onSend={handleSend} /> 
      </div>
          </>
            
    </div>
  )
}
export default App
