import { useState } from "react";
export default function App() {
const [messages, setMessages] = useState([{ role: "bot", text: "Welcome! Type a message to update the roster." }]);
const [input, setInput] = useState("");
const handleSend = async () => {
  if (!input.trim()) return;
  const userMsg = { role: "user", text: input };
  const res = await fetch("https://your-backend-url.up.railway.app/update", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: input }) });
  const data = await res.json();
  const botMsg = { role: "bot", text: data.message || data.error };
  setMessages([...messages, userMsg, botMsg]);
  setInput("");
};
return (<div><h1>LambdaBot</h1><div>{messages.map((m, i) => (<p key={i}><strong>{m.role}:</strong> {m.text}</p>))}</div><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&handleSend()} /><button onClick={handleSend}>Send</button></div>);
}