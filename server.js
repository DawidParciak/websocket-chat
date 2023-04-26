const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

const messages = [];
const users = [];

app.use(express.static((path.join(__dirname, '/client/'))));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('join', (userName) => {
    users.push({ id: socket.id, name: userName });
    socket.broadcast.emit('message', {
      author: 'Chat Bot',
      content: `<span style = "color: limegreen"><i>${userName} has joined the conversation!</i></span>`
    });
  });
  socket.on('disconnect', () => {
    const user = users.find((u) => u.id === socket.id);
    if (user) {
      const userName = user.name;
      const index = users.indexOf(user);
      users.splice(index, 1);
      socket.broadcast.emit('message', {
        author: 'Chat Bot',
        content: `<span style = "color: red"><i>${userName} has left the conversation... :(</i></span>`
      });
    };
  });
});
