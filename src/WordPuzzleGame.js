// import React, { useState, useEffect } from 'react';
// //import 'C:\Users\debor\my-game\src\style8.css';
// import './style8.css'; // Adjust the path if needed

// const puzzles = [
//     {
//         word: "CAT",
//         grid: ["C", "A", "T", "L", "B", "A", "U", "Y", "X"],
//         image: "/assets/images/cat.gif",
//         audio: "/assets/audio/catsound.mp3"
//     },
//     {
//         word: "DOG",
//         grid: ["Q", "M", "D", "H", "O", "P", "G", "X", "W"],
//         image: "/assets/images/dog1.gif",
//         audio: "/assets/audio/dogsound.mp3"
//     },
//     {
//         word: "SUN",
//         grid: ["S", "B", "P", "U", "C", "E", "N", "F", "Q"],
//         image: "/assets/images/giphy.gif",
//         audio: "/assets/audio/sunsound.mp3"
//     },
//     {
//         word: "CAR",
//         grid: ["C", "Y", "O", "A", "P", "I", "R", "K", "S"],
//         image: "/assets/images/car.gif",
//         audio: "/assets/audio/carsound.mp3"
//     }
// ];

// const WordPuzzleGame = () => {
//     const [currentPuzzle, setCurrentPuzzle] = useState(0);
//     const [foundWords, setFoundWords] = useState(new Set());
//     const [puzzleAudio] = useState(new Audio());

//     useEffect(() => {
//         initializePuzzle();
//     }, [currentPuzzle]);

//     const initializePuzzle = () => {
//         const puzzle = puzzles[currentPuzzle];
//         const puzzleElement = document.getElementById('puzzle');
//         const imageElement = document.getElementById('puzzleImage');

//         puzzleElement.innerHTML = '';
//         setFoundWords(new Set());
//         document.getElementById('message').textContent = '';

//         imageElement.src = puzzle.image;
//         imageElement.style.display = "block";

//         puzzleAudio.src = puzzle.audio;

//         for (let i = 0; i < 9; i++) {
//             const cell = document.createElement('div');
//             cell.classList.add('cell');
//             cell.setAttribute('data-letter', puzzle.grid[i]);
//             cell.innerHTML = puzzle.grid[i];
//             cell.addEventListener('click', () => {
//                 cell.classList.toggle('selected');
//                 checkWordFound(puzzle.word);
//             });
//             puzzleElement.appendChild(cell);
//         }

//         puzzleAudio.play();
//     };

//     const checkWordFound = (word) => {
//         const selectedCells = document.querySelectorAll('.selected');
//         const selectedWord = Array.from(selectedCells).map(cell => cell.getAttribute('data-letter')).join('');

//         if (selectedCells.length === word.length) {
//             if (selectedWord === word && !foundWords.has(word)) {
//                 foundWords.add(word);
//                 selectedCells.forEach(cell => {
//                     cell.classList.add('found');
//                     cell.classList.remove('selected');
//                 });
//                 document.getElementById('message').textContent = 'Great! You found the word ' + word + '!';
//                 document.getElementById('message').style.color = 'green';
//                 document.getElementById('nextPuzzleButton').style.display = "inline-block";
//                 if (currentPuzzle === puzzles.length - 1) {
//                     document.getElementById('nextPuzzleButton').textContent = 'Restart';
//                 }
//             } else if (selectedWord !== word) {
//                 document.getElementById('message').textContent = 'Oops! ' + selectedWord + ' is not the correct word.';
//                 document.getElementById('message').style.color = 'red';

//                 selectedCells.forEach(cell => {
//                     cell.classList.add('wrong');
//                 });

//                 setTimeout(() => {
//                     selectedCells.forEach(cell => {
//                         cell.classList.remove('selected');
//                         cell.classList.remove('wrong');
//                     });
//                 }, 1000);
//             }
//         }
//     };

//     const nextPuzzle = () => {
//         setCurrentPuzzle((currentPuzzle + 1) % puzzles.length);
//     };

//     const showGame = () => {
//         document.getElementById('splashScreen').style.display = 'none';
//         document.getElementById('gameContainer').style.display = 'block';
//     };

//     return (
//         <div>
//             {/* Splash Screen */}
//             <div id="splashScreen">
//                 <h1>Welcome to our website</h1>
//                 <button id="playNowButton" onClick={showGame}>Play Now</button>
//             </div>

//             {/* Game Container (initially hidden) */}
//             <div id="gameContainer" style={{ display: 'none' }}>
//                 <div id="wordDisplay"></div>
//                 <img id="puzzleImage" src="" width="300px" alt="Puzzle Image" />
//                 <div id="puzzle"></div>
//                 <div id="message"></div>
//                 <button id="nextPuzzleButton" style={{ display: 'none' }} onClick={nextPuzzle}>Next Puzzle</button>
//                 <button id="restartButton" style={{ display: 'none' }} onClick={() => setCurrentPuzzle(0)}>Restart</button>
//             </div>
//         </div>
//     );
// };

// export default WordPuzzleGame;
/*import React, { useState, useEffect } from 'react';
import './style8.css';

const puzzles = [
  {
    word: "CAT",
    grid: ["C", "A", "T", "L", "B", "A", "U", "Y", "X"],
    image: "/assets/images/cat.gif",
    audio: "/assets/audio/catsound.mp3"
  },
  {
    word: "DOG",
    grid: ["Q", "M", "D", "H", "O", "P", "G", "X", "W"],
    image: "/assets/images/dog1.gif",
    audio: "/assets/audio/dogsound.mp3"
  },
  {
    word: "SUN",
    grid: ["S", "B", "P", "U", "C", "E", "N", "F", "Q"],
    image: "/assets/images/giphy.gif",
    audio: "/assets/audio/sunsound.mp3"
  },
  {
    word: "CAR",
    grid: ["C", "Y", "O", "A", "P", "I", "R", "K", "S"],
    image: "/assets/images/car.gif",
    audio: "/assets/audio/carsound.mp3"
  }
];

function WordPuzzleGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [foundWords, setFoundWords] = useState(new Set());
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [message, setMessage] = useState('');
  const [audio] = useState(new Audio());
  
  useEffect(() => {
    const puzzle = puzzles[currentPuzzle];
    setMessage('');
    setSelectedLetters([]);
    setFoundWords(new Set());
    audio.src = puzzle.audio;
    audio.play();
  }, [currentPuzzle, audio]);

  const handleCellClick = (index) => {
    if (selectedLetters.includes(index)) {
      setSelectedLetters(selectedLetters.filter(i => i !== index));
    } else {
      setSelectedLetters([...selectedLetters, index]);
    }
  };

  const checkWordFound = () => {
    const puzzle = puzzles[currentPuzzle];
    const selectedWord = selectedLetters.map(i => puzzle.grid[i]).join('');
    
    if (selectedWord === puzzle.word) {
      setMessage(`Great! You found the word ${puzzle.word}!`);
      setFoundWords(new Set([...foundWords, puzzle.word]));
    } else if (selectedLetters.length === puzzle.word.length) {
      setMessage(`Oops! ${selectedWord} is not the correct word.`);
      setTimeout(() => setSelectedLetters([]), 1000);
    }
  };

  useEffect(() => {
    checkWordFound();
  }, [selectedLetters]);

  const handleNextPuzzle = () => {
    setCurrentPuzzle((currentPuzzle + 1) % puzzles.length);
  };

  return (
    <div className="app">
      <div id="splashScreen" style={{ display: currentPuzzle === null ? 'flex' : 'none' }}>
        <h1>Welcome to the Word Puzzle Game</h1>
        <button onClick={() => setCurrentPuzzle(0)}>Play Now</button>
      </div>

      {currentPuzzle !== null && (
        <div id="gameContainer">
          <img id="puzzleImage" src={puzzles[currentPuzzle].image} alt="Puzzle" />
          <div id="puzzle">
            {puzzles[currentPuzzle].grid.map((letter, index) => (
              <div
                key={index}
                className={`cell ${selectedLetters.includes(index) ? 'selected' : ''} ${foundWords.has(puzzles[currentPuzzle].word) ? 'found' : ''}`}
                onClick={() => handleCellClick(index)}
              >
                {letter}
              </div>
            ))}
          </div>
          <div id="message">{message}</div>
          <button id="nextPuzzleButton" onClick={handleNextPuzzle}>Next Puzzle</button>
        </div>
      )}
    </div>
  );
}

export default WordPuzzleGame;*/
import React, { useState, useEffect } from 'react';
import './style8.css';

const puzzles = [
  {
    word: "CAT",
    grid: ["C", "A", "T", "L", "B", "A", "U", "Y", "X"],
    image: "/assets/images/cat.gif",
    audio: "/assets/audio/catsound.mp3",
  },
  {
    word: "DOG",
    grid: ["Q", "M", "D", "H", "O", "P", "G", "X", "W"],
    image: "/assets/images/dog1.gif",
    audio: "/assets/audio/dogsound.mp3",
  },
  {
    word: "SUN",
    grid: ["S", "B", "P", "U", "C", "E", "N", "F", "Q"],
    image: "/assets/images/giphy.gif",
    audio: "/assets/audio/sunsound.mp3",
  },
  {
    word: "CAR",
    grid: ["C", "Y", "O", "A", "P", "I", "R", "K", "S"],
    image: "/assets/images/car.gif",
    audio: "/assets/audio/carsound.mp3",
  },
];

// List of affirmation messages
const affirmationMessages = [
  "Great job! You found the word!",
  "Excellent work!",
  "Well done!",
  "Awesome! Keep going!",
  "You're amazing!"
];

function WordPuzzleGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [foundWords, setFoundWords] = useState(new Set());
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [message, setMessage] = useState('');
  const [isWrongWord, setIsWrongWord] = useState(false);
  const [audio] = useState(new Audio());

  useEffect(() => {
    const puzzle = puzzles[currentPuzzle];
    setMessage('');
    setSelectedLetters([]);
    setFoundWords(new Set());
    setIsWrongWord(false);
    audio.src = puzzle.audio;
    audio.play();
  }, [currentPuzzle, audio]);

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const playAffirmationMessage = () => {
    const randomMessage = affirmationMessages[Math.floor(Math.random() * affirmationMessages.length)];
    setMessage(randomMessage);
    speakText(randomMessage);  // Convert message to speech
  };

  const playErrorMessage = () => {
    const errorMessage = "Oops! That's not the correct word.";
    setMessage(errorMessage);
    speakText(errorMessage);  // Convert error message to speech
  };

  const handleCellClick = (index) => {
    if (selectedLetters.includes(index)) {
      setSelectedLetters(selectedLetters.filter(i => i !== index));
    } else {
      setSelectedLetters([...selectedLetters, index]);
    }
  };

  const checkWordFound = () => {
    const puzzle = puzzles[currentPuzzle];
    const selectedWord = selectedLetters.map(i => puzzle.grid[i]).join('');

    if (selectedWord === puzzle.word) {
      playAffirmationMessage();  // Speak success message
      setFoundWords(new Set([...foundWords, puzzle.word]));
      setIsWrongWord(false);
    } else if (selectedLetters.length === puzzle.word.length) {
      playErrorMessage();  // Speak error message
      setIsWrongWord(true);

      // Reset the selected letters after a brief delay
      setTimeout(() => {
        setSelectedLetters([]);
        setIsWrongWord(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (selectedLetters.length) {
      checkWordFound();
    }
  }, [selectedLetters]);

  const handleNextPuzzle = () => {
    setCurrentPuzzle((currentPuzzle + 1) % puzzles.length);
  };

  return (
    <div className="app">
      <div id="splashScreen" style={{ display: currentPuzzle === null ? 'flex' : 'none' }}>
        <h1>Welcome to the Word Puzzle Game</h1>
        <button onClick={() => setCurrentPuzzle(0)}>Play Now</button>
      </div>

      {currentPuzzle !== null && (
        <div id="gameContainer">
          <img id="puzzleImage" src={puzzles[currentPuzzle].image} alt="Puzzle" />
          <div id="puzzle">
            {puzzles[currentPuzzle].grid.map((letter, index) => (
              <div
                key={index}
                className={`cell 
                  ${selectedLetters.includes(index) ? 'selected' : ''} 
                  ${foundWords.has(puzzles[currentPuzzle].word) && selectedLetters.includes(index) ? 'found' : ''}
                  ${isWrongWord && selectedLetters.includes(index) ? 'wrong' : ''}`}
                onClick={() => handleCellClick(index)}
              >
                {letter}
              </div>
            ))}
          </div>
          <div id="message">{message}</div>
          <button id="nextPuzzleButton" onClick={handleNextPuzzle}>Next Puzzle</button>
        </div>
      )}
    </div>
  );
}

export default WordPuzzleGame;
