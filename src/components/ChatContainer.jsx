import React from "react";
import socketIO from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const socket = socketIO.connect("https://ecommerce-backend-gr3e.onrender.com");
// socket connect garne server url ma chai /api rakhnupardaina hai last ma
const ChatContainer = ({ customerId, talkerName }) => {
  // const cusId = customerId;
  // console.log(cusId, "id");
  const chatListRef = useRef(null);

  console.log(customerId, "sss");
  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));

  const [customerMessages, setCustomerMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const user1Id = localStorage.getItem("userId");
  const localstorageName = localStorage.getItem("fullName");

  useEffect(() => {
    // socket.on("receive message", (data) => {
    //   console.log(data, "here");
    //   if (
    //     (data.receiverId === user1Id && data.senderId === customerId) ||
    //     (data.senderId === user1Id && data.receiverId === customerId)
    //   ) {
    //     setCustomerMessages([...customerMessages, data]);
    //   }
    // });
    if (customerId) {
      getMessages();
    }
  }, [customerId]);

  console.log(customerMessages, "msg");
  // console.log(customerMessages, "rrr");
  console.log(customerId, "lll");
  const sendMsg = () => {
    console.log("clikc");
    socket.emit("send message", {
      senderId: user1Id,
      receiverId: customerId,
      message: chatMessage,
      senderName: localstorageName,
      socketId: socket.id,
    });
  };

  const getMessages = async () => {
    const url = `${baseUrl}/fetch-messages?senderId=${customerId}&receiverId=${user1Id}`;
    const config = {
      headers: { Authorization: "Bearer " + accesstoken },
      // not authorized to post bhanne error aairathyo, because accesstoken ta string ma liyrathyam loccal storage bata, because stringify garera store garirathyam local storge ma,,,,tara yaha ta json value mai chahincha bearer sanga so mathi access token lai json.parse garera yo problem solve bhayo
    };
    try {
      const response = await axios.get(url, config);

      setCustomerMessages(response.data.data.messages);
      console.log(customerMessages, "atti");
    } catch (error) {
      console.error(error);
    }
  };

  const clickSend = async () => {
    const url = `${baseUrl}/send-message`;
    const data = {
      senderId: user1Id,
      receiverId: customerId,
      message: chatMessage,
      // receiverUsername:
    };
    const config = {
      headers: { Authorization: "Bearer " + accesstoken },
      // not authorized to post bhanne error aairathyo, because accesstoken ta string ma liyrathyam loccal storage bata, because stringify garera store garirathyam local storge ma,,,,tara yaha ta json value mai chahincha bearer sanga so mathi access token lai json.parse garera yo problem solve bhayo
    };
    console.log(chatMessage, "lll");
    axios
      .post(url, data, config)
      .then((response) => {
        console.log(response.data);
        getMessages();
        socket.emit(
          "send message",
          {
            senderId: user1Id,
            receiverId: customerId,
            message: chatMessage,
            senderName: localstorageName,
            socketId: socket.id,
          },
          () => {}
        );
      })
      .catch(function (error) {
        console.error(error);
        console.log("Error is recognized!");
      });
  };
  useEffect(() => {
    socket.on("send message", (data) => {
      // debugger;
      // if (
      //   (data.receiverId === user1Id && data.senderId === customerId) ||
      //   (data.senderId === user1Id && data.receiverId === customerId)
      console.log(customerMessages, "kkk");
      getMessages();
      // ) {
      // setCustomerMessages((prevMessages) => [...prevMessages, data]);

      // }
    });
  }, [socket]);

  //to set the last possible msg as selected chat
  useEffect(() => {
    setSelectedChat(customerMessages[customerMessages.length - 1]?.message);
  }, [customerMessages]);

  useEffect(() => {
    // Scroll to the selected chat when it changes
    if (selectedChat && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      // chatListRef.current.scrollTop = chatListRef.current.scrollHeight; sets the scroll position of the chat list to its maximum value, which effectively scrolls it to the bottom. This ensures that the most recent chat message is always visible to the user without needing to manually scroll down.
    }
  }, [selectedChat]);

  return (
    <>
      <div className="chat-container-45">
        {/* Modal content */}
        {/* Close button */}
        <div className="seller-name-chat">Chat with Seller: {talkerName}</div>
        {talkerName ? (
          <>
            <div className="msg-container-chat">
              <div className="chat-area-chat" ref={chatListRef}>
                {customerMessages.map((item) => {
                  if (user1Id !== item.receiverId) {
                    return (
                      <>
                        <div className="chat-component-buyer-chat">
                          <div className="buyer-chat-chat">
                            <p>{item.message}</p>
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className="chat-component-seller-chat">
                          <div className="seller-chat-chat">
                            <p>{item.message}</p>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </div>

              <div className="typing-box-chat">
                <input
                  //   value={input}
                  type="text"
                  className="typing-chat"
                  value={input}
                  onChange={
                    (e) => {
                      setChatMessage(e.target.value);
                      setInput(e.target.value);
                    }
                    //   }
                  }
                />
                <button
                  type="button"
                  className="msg-send-button-chat"
                  //   onClick={(e) => {
                  //     e.preventDefault();
                  //     // setChatMessage(e);
                  //     setInput(" ");
                  //     clickSend();
                  //   }}
                  onClick={() => {
                    sendMsg();
                    clickSend();
                    setInput("");
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-full w-full flex justify-center items-center">
              <p className="font-bold text-xl">
                Hey, no seller selected to chat with!
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatContainer;
