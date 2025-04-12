import React, { useState } from 'react';
import './App.css';

function App() {
  const choices = ['剪刀', '石頭', '布'];
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [gameCount, setGameCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [reward, setReward] = useState('');

  const playGame = (choice) => {
    if (gameCount >= 3) return; // 遊戲次數達到三次後停止

    setPlayerChoice(choice);
    const computer = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computer);

    let currentWinCount = winCount; // 使用臨時變數追蹤勝利次數

    if (choice === computer) {
      setResult('Draw');
    } else {
      if (
        (choice === '剪刀' && computer === '布') ||
        (choice === '石頭' && computer === '剪刀') ||
        (choice === '布' && computer === '石頭')
      ) {
        setResult('You Win!');
        currentWinCount += 1;
        setWinCount(currentWinCount);
      } else {
        setResult('You Lose!');
      }
      setGameCount(gameCount + 1); // 只在贏或輸時計算次數
    }

    if (gameCount + 1 === 3) {
      // 遊戲結束後決定獎品
      if (currentWinCount === 1) {
        setReward('巧克力一份');
      } else if (currentWinCount === 2) {
        setReward('Line貼圖');
      } else if (currentWinCount === 3) {
        setReward('巧克力一份和Line貼圖');
      }
    }
  };

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    setGameCount(0);
    setWinCount(0); // 確保 winCount 也被重置
    setReward('');
  };

  return (
    <div className="App">
      <h1>Kaedeㄉ生日猜拳</h1>
      <div className="choices">
        <button onClick={() => playGame('剪刀')}>
          <img src={require('./assets/scissors.png')} alt="剪刀" className="choice-image" />
        </button>
        <button onClick={() => playGame('石頭')}>
          <img src={require('./assets/rock.png')} alt="石頭" className="choice-image" />
        </button>
        <button onClick={() => playGame('布')}>
          <img src={require('./assets/paper.png')} alt="布" className="choice-image" />
        </button>
      </div>
      <div className="results">
        {computerChoice && (
          <img
            src={require(`./assets/${
              computerChoice === '剪刀' ? 'scissors' : computerChoice === '石頭' ? 'rock' : 'paper'
            }.png`)}
            alt={computerChoice}
            className="choice-image"
          />
        )}
        <h2>{result}</h2>
      </div>
      {gameCount === 3 && (
        <>
          <div className="reward">
            <h3>Game Over!</h3>
            <p>You win {winCount} times!</p>
            <p>恭喜尼得到：{reward}</p>
          </div>
          <button className="reset-button" onClick={resetGame}>我不管! 反悔重來</button>
        </>
      )}
    </div>
  );
}

export default App;
