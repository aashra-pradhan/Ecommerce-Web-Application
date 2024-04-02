import React, { useState, useEffect } from "react";
import ChatContainer from "../../components/ChatContainer";
import socketIO from "socket.io-client";
import axios from "axios";

const socket = socketIO.connect("https://ecommerce-backend-gr3e.onrender.com");
const ChatSection = () => {
  const [customerMessages, setCustomerMessages] = useState([]);
  const [withoutDuplicates, setWithoutDuplicates] = useState([]);
  // const [senderDet, setSenderDet] = useState({});
  const [customerId, setCustomerId] = useState("");
  const [talkerName, setTalkerName] = useState("");
  // const [chatMessage, setChatMessage] = useState("");
  const [chatterNames, setChatterNames] = useState([]);
  const user1Id = localStorage.getItem("userId");
  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));
  useEffect(() => {
    // socket.on("receive message", (data) => {
    // console.log(data, "here");
    getChattersList();
    // });
  }, [socket]); //bro yo without refresh new chatters chai load bhairachaina please fix it

  // useEffect(() => {
  //   socket.on("receive message", (data) => {
  //     console.log(data, "here");

  //     // setBackendMessages([...backendMessages, data]);
  //   });
  // }, [socket]);

  const getChattersList = async () => {
    const url = `${baseUrl}/fetch-recipients?loggedInUserId=${user1Id}`;
    const config = {
      headers: { Authorization: "Bearer " + accesstoken },
      // not authorized to post bhanne error aairathyo, because accesstoken ta string ma liyrathyam loccal storage bata, because stringify garera store garirathyam local storge ma,,,,tara yaha ta json value mai chahincha bearer sanga so mathi access token lai json.parse garera yo problem solve bhayo
    };
    try {
      const response = await axios.get(url, config);
      // console.log(response, "aaa");
      setChatterNames(response.data.data);
      console.log(chatterNames, "qwerty");
      // setChatMessage(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  function removeDuplicates(arr) {
    setWithoutDuplicates(
      // arr.filter((item, index) => arr.indexOf(item) === index)
      arr.filter(
        (item, index) => arr.findIndex((obj) => obj.id === item.id) === index
      )
    );
    console.log(withoutDuplicates, "qqq");
  }

  useEffect(() => {
    removeDuplicates(chatterNames);
  }, [chatterNames]);

  return (
    <>
      <div className="chat-container">
        <div className="inside-chat-container">
          <div className="title-chats">My Chats</div>
          <div className="chat-name-list">
            {/* {chatterNames.filter(
              (obj, index) =>
                chatterNames.findIndex((item) => item.id === obj.id) ===
                index
            )} */}
            {withoutDuplicates?.map((item) => {
              return (
                <>
                  <div
                    className="each-chatter-name"
                    key={item?.id} // Add key prop here
                    onClick={() => {
                      setCustomerId(item?.id);
                      setTalkerName(item?.userName);
                      console.log(customerId, "www");
                    }}
                  >
                    {item?.userName}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="chat-bhitra-other-part">
        <ChatContainer customerId={customerId} talkerName={talkerName} />
      </div>
    </>
  );
};

export default ChatSection;
