// import { Assistant } from "./assistant";

// export default function Home() {
//   return <Assistant />;
// }

"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function handleSend() {
    if (!input.trim()) return;

    setResponse("Thinking...");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", parts: [{ type: "text", text: input }] },
          ],
        }),
      });

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      // ✅ Gemini’s reply
      setResponse(data.text || "No response text received");
    } catch (err: any) {
      console.error(err);
      setResponse("Error: " + err.message);
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Gemini Chat</h1>

      <textarea
        rows={3}
        style={{ width: "100%", marginTop: "1rem", padding: "0.5rem" }}
        placeholder="Type your question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSend}
        style={{
          background: "#2563eb",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          marginTop: "0.5rem",
        }}
      >
        Send
      </button>

      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          background: "#f9fafb",
          minHeight: "100px",
        }}
      >
        <strong>AI Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
