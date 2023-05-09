import { useState } from "react";
import ScrollToBottom from "./ScrollToBottom";

function AutoScrollToBottom() {
  const [list, setList] = useState([
    {
      type: "incoming",
      message: "Hello",
    },
    {
      type: "outgoing",
      message: "Hi",
    },
    {
      type: "incoming",
      message: "How are you?",
    },
    {
      type: "outgoing",
      message: "I am fine",
    },
    {
      type: "incoming",
      message: "What about you?",
    },
    {
      type: "outgoing",
      message: "I am fine too",
    },
    {
      type: "incoming",
      message: "How is your family?",
    },
    {
      type: "outgoing",
      message: "They are fine too",
    },
    {
      type: "incoming",
      message: "Thank you",
    },
    {
      type: "outgoing",
      message: "Welcome",
    },
    {
      type: "incoming",
      message: "Bye",
    },
    {
      type: "outgoing",
      message: "Bye",
    },
    {
      type: "incoming",
      message: "Bye",
    },
  ]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!message) return;

    setList((prev) => [
      ...prev,
      {
        type: "outgoing",
        message,
      },
    ]);
    setMessage("");
    setTimeout(() => {
      setList((prev) => [
        ...prev,
        {
          type: "incoming",
          message,
        },
      ]);
    }, 1000);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        marginTop: 80,
      }}
    >
      <h1 style={{ textAlign: "center" }}>Chat Box</h1>
      <div
        style={{
          border: "1px solid rgba(0,0,0,0.5)",
        }}
      >
        <ScrollToBottom
          height={400}
          style={{
            padding: "0px 20px",
          }}
        >
          {list.map((item, index) => (
            <div
              style={{
                display: "flex",
                justifyContent:
                  item.type === "incoming" ? "flex-start" : "flex-end",
              }}
              key={index}
            >
              <p
                style={{
                  backgroundColor:
                    item.type === "incoming" ? "lightblue" : "lightgreen",
                  padding: "5px 10px",
                  borderRadius: 5,
                  maxWidth: 200,
                }}
              >
                {item.message}
              </p>
            </div>
          ))}
        </ScrollToBottom>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message"
              style={{
                flex: 1,
                border: "none",
                borderTop: "1px solid rgba(0,0,0,0.5)",
                outline: "none",
                height: 30,
                padding: "0px 10px",
              }}
            />
            <button
              style={{
                padding: "0px 15px",
                backgroundColor: "black",
                color: "white",
                border: "1px solid rgba(0,0,0,0.5)",
              }}
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AutoScrollToBottom;
