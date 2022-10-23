import React, { useState, useEffect, useRef } from "react";
import { over } from "stompjs";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SERVER } from "../../util/Variables";
import styles from "./chatroom.module.scss";
import { useSelector } from "react-redux";
import { WebSocket } from "ws";
import * as StompJs from "@stomp/stompjs";
import { useLocation, useNavigate } from "react-router-dom";

export const ChatRoom = () => {
  const token = useSelector((state) => state.token.accessToken);

  let client = useRef(null);

  // const useInterval = (callback, delay) => {
  //   const savedCallback = useRef();

  //   useEffect(() => {
  //     savedCallback.current = callback;
  //   });

  //   useEffect(() => {
  //     function tick() {
  //       savedCallback.current();
  //     }

  //     const timerId = setInterval(tick, delay);
  //     return () => clearInterval(timerId);
  //   }, [delay]);
  // };

  const navigate = useNavigate();
  const clickXBtnHandler = () => {
    navigate("/");
  };

  // useInterval(() => {
  //   if (!client.current.connected) {
  //     client.current.activate();
  //   }
  // }, 1000);
  useEffect(() => {
    if (!client.current) {
      client.current = new StompJs.Client({
        // brokerURL: `http://localhost:8080/ws`,
        // webSocketFactory: () => new SockJS(`/ws`),
        webSocketFactory: () => new SockJS(`${SERVER}/ws`),
        transport: "xhr-polling",
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug: (str) => {
          console.log(new Date(), str);
        },
        onConnect: () => {
          onConnected();
        },
        onDisconnect: () => {
          registerUser();
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        connectionTimeout: 10000,
      });
    }
  }, []);

  //   useEffect(() => {
  //     client.current.activate();
  //     return () => {
  //       client.current.deactivate();
  //     };
  //   }, []);

  //   useEffect(() => {
  //     client.activate();
  //     console.log("client", client);
  //   }, []);

  //   let stompClient = useRef({});
  const [publicChat, setPublicChat] = useState([]);

  const [userData, setUserData] = useState({
    username: "",
    receiver: "",
    connected: false,
    message: "",
  });

  const [input, setInput] = useState("");
  //   const [privateChat, setPrivateChat] = useState(new Map());
  //   const [tab, setTab] = useState("CHATROOM");
  //   const handleMessage = (e) => {
  //     const { value } = e.target;
  //     setUserData({
  //       ...userData,
  //       message: value,
  //     });
  //   };

  // useEffect(() => {
  //   const sock = new SockJS(`${SERVER}/ws`);
  //   stompClient.current = Stomp.over(sock);
  //   // stompClient.
  //   stompClient.current.connect({}, onConnected, onError);
  // }, [publicChat]);

  //   const registerUser = () => {
  //     const Sock = new SockJS(`${SERVER}/ws`);
  //     stompClient = over(Sock);
  //     stompClient.connect(
  //       { Authorization: `Bearer ${token}` },
  //       onConnected,
  //       onError
  //     );
  //   };

  const registerUser = () => {
    client.current.activate();
  };

  const onConnected = () => {
    setUserData({
      ...userData,
      connected: true,
    });
    client.current.subscribe("/topic/public", onPublicMessageReceived, {
      Authorization: `Bearer ${token}`,
    });
    userJoin();
    console.log("client", client);
  };

  //   const onConnected = () => {
  //     setUserData(
  //       {
  //         ...userData,
  //         connected: true,
  //       },
  //       stompClient.subscribe("/topic/public", onPublicMessageReceived)
  //       // stompClient.subscribe('/app/public', onPrivateMessageReceived);
  //     );
  //     userJoin();
  //   };

  //   const userJoin = () => {
  //     const content = `${userData.username} joined the chat`;
  //     const MessageType = "JOIN";
  //     stompClient.send(
  //       "/app/public",
  //       { Authorization: `Bearer ${token}` },
  //       JSON.stringify({
  //         content: content,
  //         messageType: MessageType,
  //       })
  //     );
  //   };

  const userJoin = () => {
    console.log(client.current.connected ? "연결됨" : "연결안됨");
    console.log("client", client.current);
    const content = `${userData.username}님께서 입장하셨습니다.`;
    const MessageType = "JOIN";
    client.current.publish({
      destination: "/app/public",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: content,
        messageType: MessageType,
      }),
    });
  };

  const onPublicMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    const { content, nickName, messageType, createdAt } = message;
    const chat = {
      content,
      nickName,
      messageType,
      createdAt,
    };
    setPublicChat((prev) => [...prev, chat]);
  };

  //   const onPrivateMessageReceived = (payload) => {
  //     const message = JSON.parse(payload.body);
  //     switch (message.MessageType) {
  //       case "JOIN":
  //         if (!privateChat.get(message.senderName)) {
  //           privateChat.set(message.senderName, []);
  //           setPrivateChat(new Map(privateChat));
  //         }
  //         break;
  //       case "LEAVE":
  //         break;
  //       case "CHAT":
  //         privateChat.push(message);
  //         setPrivateChat([...privateChat]);
  //         break;
  //       default:
  //         break;
  //     }
  //   };

  const onError = (error) => {
    console.log(error);
  };
  const sendPublicMessage = (e) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    client.current.publish({
      destination: "/app/public",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: input,
        messageType: "CHAT",
      }),
    });
    setInput("");
  };

  //   const sendPublicMessage = () => {
  //     console.log("sendPublicMessage");
  //     // if (!stompClient || !stompClient.connected) {
  //     //   registerUser();
  //     // }
  //     stompClient.send(
  //       "/app/public",
  //       {},
  //       JSON.stringify({
  //         content: input,
  //         messageType: "CHAT",
  //       })
  //     );
  //     setUserData({
  //       ...userData,
  //       message: "",
  //     });
  //   };

  //   const disconnect = () => {
  //     if (stompClient !== null) {
  //       stompClient.disconnect();
  //     }
  //     setUserData({
  //       ...userData,
  //       connected: false,
  //     });
  //   };

  const disconnect = () => {
    client.current.deactivate();
    setUserData({
      ...userData,
      connected: false,
    });
  };

  const handleMessages = (e) => {
    setInput(e.target.value);
  };

  // const sendPrivateMessage = () => {
  //     const message = {
  //         content: userData.message,
  //         type: 'CHAT',
  //         receiver: userData.receiver,
  //     };
  //     stompClient.send('/app/private', {}, JSON.stringify(message));
  //     setUserData({
  //         ...userData,
  //         message: '',
  //     });
  // }

  useEffect(() => {
    scrollToBottom();
  }, [publicChat]);

  // const scrollRef = useRef();
  // const scrollToBottom = () => {
  //   scrollRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "end",
  //     inline: "nearest",
  //   });
  // };

  return (
    <div className={styles.chattingContainer}>
      {userData.connected ? (
        <div className={styles.chatBox}>
          <div className={styles.memberList} ref={scrollRef}>
            <ul>
              <li className={styles.chatHeader}>Chatroom</li>
              {publicChat.map((chat, index) => (
                <li key={index} className={styles.chat}>
                  <div className={styles.nickName}>
                    {chat.nickName}님의 말 :
                  </div>
                  <div className={styles.content}>{chat.content}</div>
                  <div className={styles.createdAt}></div>
                </li>
              ))}
            </ul>
            <div className={styles.sendMessage}>
              <form onSubmit={sendPublicMessage} className={styles.inputBox}>
                <input
                  type="text"
                  name="message"
                  value={input}
                  onChange={handleMessages}
                  className={styles.input}
                />
                <button className={styles.send}>Send</button>
                <button onClick={disconnect} className={styles.disconnect}>
                  Disconnect
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.door}>
          <h1>Dev_illage Chat</h1>
          <div className={styles.info}>
            <h3> Dev_illage 채팅방입니다.</h3>
            <p> 1. 분란을 일으킬 수 있는 행동을 하지 마세요.</p>
            <p> 2. 비방, 욕설, 성적인 언어를 사용하지 마세요.</p>
            <p> 3. 경고 없이 영구 탈퇴 처리 될 수 있습니다.</p>
            <p> 4. 위 사항에 동의하신다면 아래 버튼을 눌러 입장하세요.</p>
          </div>
          <button onClick={registerUser}>동의합니다</button>
          <div className={styles.xBtn} onClick={clickXBtnHandler}>
            X
          </div>
        </div>
      )}
    </div>
  );
};
