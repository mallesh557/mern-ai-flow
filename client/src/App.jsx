import { useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

export default function App() {
  
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  
  // Connect to backend
  const handleSave = async () => {
  try {
    await axios.post("https://mern-ai-backend-o5pq.onrender.com/api/save", {
      prompt: input,
      response: result,
    });

    alert("Saved to MongoDB ");
  } catch (error) {
    alert("Save failed ");
  }
};
  const handleRun = async () => {
    try {
      setLoading(true);

      const res = await axios.post("https://mern-ai-backend-o5pq.onrender.com/api/ask-ai", {
        prompt: input,
      });

      setResult(res.data.answer);
    } catch (error) {
      console.error(error);
      setResult("Error connecting to backend ");
    } finally {
      setLoading(false);
    }
  };

  const nodes = [
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: {
        label: (
          <textarea
            placeholder="Enter prompt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "200px", height: "80px" }}
          />
        ),
      },
    },
    {
      id: "2",
      position: { x: 400, y: 100 },
      data: {
        label: (
          <div style={{ maxWidth: "200px", minHeight: "80px", border: "1px solid #ccc", padding: "10px" }}>
            {loading ? "Loading..." : result || "Result will appear here"}
          </div>
        ),
      },
    },
  ];

  const edges = [{ id: "e1-2", source: "1", target: "2" }];

  return (
    <div style={{ height: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>AI Flow App</h2>

      
    <button onClick={handleRun}>Run Flow</button>
<button onClick={handleSave} style={{ marginLeft: "10px" }}>
  Save
</button>
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
}