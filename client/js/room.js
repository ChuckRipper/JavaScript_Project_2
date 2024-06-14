document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('You need to be logged in to join a room');
      window.location.href = '/login.html';
      return;
    }
  
    const createRoomButton = document.getElementById('create-room');
    const joinRoomButton = document.getElementById('join-room');
  
    if (createRoomButton) {
      createRoomButton.addEventListener('click', async () => {
        const response = await fetch('/api/rooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        const result = await response.json();
        if (response.ok) {
          alert('Room created! Share the room code with your friends.');
          // Display room code to the user
        } else {
          alert(result.error);
        }
      });
    }
  
    if (joinRoomButton) {
      joinRoomButton.addEventListener('click', async () => {
        const roomCode = prompt('Enter the room code:');
        const response = await fetch('/api/rooms/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ roomCode })
        });
  
        const result = await response.json();
        if (response.ok) {
          alert('Joined the room!');
          // Redirect or update UI to show the room details
        } else {
          alert(result.error);
        }
      });
    }
  });
  