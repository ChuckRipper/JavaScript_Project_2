document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty');
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('You need to be logged in to play the game');
      window.location.href = '/login.html';
      return;
    }
  
    // Logic to generate the game board based on the difficulty level
  
    const endGame = async (score, gameTime) => {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ score, gameTime })
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Game over! Your score has been saved.');
      } else {
        alert(result.error);
      }
    };
  
    // Call endGame(score, gameTime) when the game ends
  });
  