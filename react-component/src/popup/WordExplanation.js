import React, { useState } from "react";

const WordExplanation = ({ text = "Default text" }) => {
  const [popupContent, setPopupContent] = useState("");
  const [popupPosition, setPopupPosition] = useState({});

  const handleWordClick = (word, event) => {
    // Simulating fetching explanation based on the clicked word
    const explanation = `${word}:`;
    setPopupContent(explanation);
    setPopupPosition({
      top: word.clientY + "px",
      left: word.clientX + "px",
    });
  };

  const closePopup = () => {
    setPopupContent("");
  };

  const words = text.split(" ");

  const speakWord = (word) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = word;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      {words.map((word, index) => (
        <span
          key={index}
          onMouseEnter={(e) => handleWordClick(word, e)}
          onClick={(e) => speakWord(word)}
        >
          {word}{" "}
        </span>
      ))}
      {popupContent && (
        <div
          className="popup"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            backgroundColor: "#ee70d1",
            display: "inline-block",
          }}
        >
          <div style={{ color: "#000000" }}>{popupContent}</div>
          {/* <button onClick={closePopup}>Close</button> */}
        </div>
      )}
    </div>
  );
};

export default WordExplanation;
