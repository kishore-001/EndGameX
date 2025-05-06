import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Keyboard from "./Components/Keyboard";
import Language from "./Components/Language";
import Notice from "./Components/Notice";
import Placeholder from "./Components/Placeholder";
import { wordlist , languages , key } from "./Data/data";
import party from "party-js";



export default function App() {


  const [wordToGuess, setWordToGuess] = useState(() => {
    const word = wordlist[Math.floor(Math.random() * wordlist.length)];
    console.log("Random word:", word);
    return word;
  });
  

  const [keystate, setkeystate] = useState(key);
  const [attempts, setAttempts] = useState(0);
  const [placeholder, setPlaceholder] = useState([]);
  const [haswon,setHaswon] = useState(false);
  const [haslost,setHaslost] = useState(false);
  const [languageset, setLanguageset] = useState(languages);



  useEffect(() => {
    setPlaceholder(Array(wordToGuess.length).fill(""));
  }, [wordToGuess]);
  
  function handlekeypress(id)
  {
    
      console.log("Key pressed:", id);
      const letter = String.fromCharCode(96 + parseInt(id)).toUpperCase(); // "a" -> "A"
    
      let updatedPlaceholder = [...placeholder];
      let found = false;
      wordToGuess.split("").forEach((l, index) => {
        if (l === letter) {
          updatedPlaceholder[index] = letter;
          found = true;
        }
      });
      setPlaceholder(updatedPlaceholder);
    
      // Update key status
      const updatedKeys = keystate.map(k =>
        k.id === parseInt(id) ? { ...k, status: found ? "correct" : "wrong" } : k
      );
      setkeystate(updatedKeys);

      if (updatedPlaceholder.join("") === wordToGuess) {
        console.log("You won!");
        setHaswon(true);
        party.confetti(document.body);
      }
      if (found) {
        console.log("Letter found!");
      } else {
        console.log("Letter not found!");
        const nextAttempt = attempts + 1;
    setAttempts(nextAttempt);

    // Update languageset to set status: false for that language
    setLanguageset(prev =>
      prev.map(lang =>
        lang.id === nextAttempt ? { ...lang, status: false } : lang
      )
    );
      }
      if (attempts > 7) {
        console.log("You lost!");
        setHaslost(true);
      }
  }

  function restartgame() {
    console.log("Game restarted");
    setHaslost(false);
    setHaswon(false);
    const newWord = wordlist[Math.floor(Math.random() * wordlist.length)];
    setWordToGuess(newWord);
    setPlaceholder(Array(newWord.length).fill(""));
    setkeystate(key); // reset key states
    setAttempts(0);
    setHaswon(false);
  }
  

  return (
    <>
      <Notice restartgame={restartgame} haswon={haswon} haslost={haslost}/>
      <Language languages={languageset}/>
      <Placeholder placeholder={placeholder} />
      <Keyboard keystate={keystate} handlekeypress={handlekeypress} />
    </>
  );
}
