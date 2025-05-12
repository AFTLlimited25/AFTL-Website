const chatBox = document.getElementById("chat-box");

function addMessage(sender, message) {
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${message}`;
  msg.style.margin = "5px 0";
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  // Replace with your real OpenAI API key and endpoint
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content.trim();
  addMessage("AFTL Bot", reply);
}
