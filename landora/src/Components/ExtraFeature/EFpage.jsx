import React, { useState, useRef, useEffect } from "react";
import { Container, TextField, Button, Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const EFpage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/prompt-post", { prompt: input });
      const botMessage = { role: "assistant", content: response.data.response || "🤖 No response received." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Error: Unable to fetch response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Card sx={{ width: "100%", maxWidth: 600, p: 2, borderRadius: 3, boxShadow: 5, bgcolor: "#f9f9f9" }}>
        <CardContent>
          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
            LANDORA AI
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center", color: "gray", mb: 2 }}>
            Your Virtual Assistant
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxHeight: 400, overflowY: "auto", p: 1 }}>
            {messages.map((msg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Typography
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: msg.role === "user" ? "#1976d2" : "#e0e0e0",
                    color: msg.role === "user" ? "#fff" : "#000",
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                  }}
                >
                  <strong>{msg.role === "user" ? "You" : "LANDORA"}:</strong> {msg.content}
                </Typography>
              </motion.div>
            ))}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Typography sx={{ color: "gray", alignSelf: "flex-start" }}>🤖 LANDORA is typing...</Typography>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ display: "flex", width: "100%", maxWidth: 600, mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <Button variant="contained" sx={{ ml: 1, bgcolor: "#1976d2" }} onClick={sendMessage} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
        </Button>
      </Box>
    </Container>
  );
};

export default EFpage;
