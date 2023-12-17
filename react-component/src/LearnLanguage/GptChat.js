import React, { useState } from "react";
import axios from "axios";

const GptChat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const api_key = `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`;

  const askQuestion = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: question,
          max_tokens: 150,
          temperature: 0.7,
          n: 1,
          stop: "\n",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + api_key,
          },
        }
      );

      setResponse(response.data.choices[0].text.trim());
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Error fetching response. Please try again.");
    }
  };

  return (
    <div>
      <h1>Chat with GPT-3</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
      <br />
      <button onClick={askQuestion}>Ask</button>
      <br />
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GptChat;
