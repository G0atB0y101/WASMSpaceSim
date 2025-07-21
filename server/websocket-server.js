// Minimal WebSocket server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  // Send ping every 3 seconds
  const interval = setInterval(() => {
    ws.send('ping');
  }, 3000);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if (message === 'pong') {
      ws.send('pong received');
    }
  });

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8000');
