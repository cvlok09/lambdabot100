
import { useState } from "react";

export default function RosterChatbotWeb() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Welcome to the Fraternity Roster Chatbot! Type 'help' for options." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    const botResponse = getBotResponse(input);
    setMessages([...messages, userMessage, { role: "bot", text: botResponse }]);
    setInput("");
  };

  const getBotResponse = (input) => {
    const cmd = input.toLowerCase().trim();
    if (cmd === "help") {
      return "Commands: help, dues, paid, all, exit";
    } else if (cmd === "dues") {
      return "[Placeholder] Members with outstanding dues: Charlie Klein, Jaime Perez, Constantine Theodoratos, etc.";
    } else if (cmd === "paid") {
      return "[Placeholder] Fully paid members: Jeffrey Witous, Kosta Kalamaras, etc.";
    } else if (cmd === "all") {
      return "[Placeholder] All members listed. (This would be a full scrollable list.)";
    } else if (cmd === "exit") {
      return "Goodbye! Refresh the page to start over.";
    } else {
      return "Unknown command. Type 'help' to see available options.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">Fraternity Roster Chatbot</h1>
        <div className="h-64 overflow-y-auto border p-4 rounded mb-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-xl ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            className="flex-1 border rounded-l-xl px-4 py-2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-xl"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
