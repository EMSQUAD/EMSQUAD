import { WebSocket } from 'expo';

class WokitokiLogic {
  constructor() {
    this.users = [];
    this.activeUser = null;
    this.socket = new WebSocket('ws://localhost:8080');

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message received:', data);
      switch (data.type) {
        case 'user-joined':
          console.log('User joined:', data.user);
          this.onUserJoined(data.user);
          break;
        case 'user-left':
          console.log('User left:', data.user);
          this.onUserLeft(data.user);
          break;
        case 'user-speaking':
          console.log('User speaking:', data.user);
          this.onUserSpeaking(data.user);
          break;
      }
    };
  }

  onUserJoined(user) {
    console.log('User joined:', user);
    this.users.push(user);
    this.emit('user-joined', user);
  }

  onUserLeft(user) {
    console.log('User left:', user);
    this.users = this.users.filter(u => u.id !== user.id);
    this.emit('user-left', user);
  }

  onUserSpeaking(user) {
    console.log('User speaking:', user);
    this.activeUser = user;
    this.emit('user-speaking', user);
  }

  start() {
    console.log('Starting connection...');
    this.socket.send(JSON.stringify({ type: 'join' }));
  }

  end() {
    console.log('Ending connection...');
    this.socket.send(JSON.stringify({ type: 'leave' }));
    this.socket.close();
    console.log('WebSocket connection closed');
  }

  emit(event, data) {
    console.log('Emitting event:', event, 'with data:', data);
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: event, data }));
    }
  }
}

export default WokitokiLogic;
