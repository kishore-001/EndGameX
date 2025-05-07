import { useState, useEffect } from "react";
import "./App.css";
import Keyboard from "./Components/Keyboard";
import Language from "./Components/Language";
import Notice from "./Components/Notice";
import Placeholder from "./Components/Placeholder";
import { wordlist, languages, key, removalmsg } from "./Data/data";
import party from "party-js";

export default function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    const word = wordlist[Math.floor(Math.random() * wordlist.length)];
    console.log("Random word:", word);
    return word;
  });

  const [keystate, setKeystate] = useState(key);
  const [attempts, setAttempts] = useState(0);
  const [placeholder, setPlaceholder] = useState([]);
  const [haswon, setHaswon] = useState(false);
  const [haslost, setHaslost] = useState(false);
  const [languageset, setLanguageset] = useState(languages);

  useEffect(() => {
    setPlaceholder(Array(wordToGuess.length).fill(""));
  }, [wordToGuess]);

  function handlekeypress(id) {
    // Prevent re-clicking already used keys
    const keyPressed = keystate.find(k => k.id === id);
    if (!keyPressed || keyPressed.status !== "idle") return;

    console.log("Key pressed:", id);
    const letter = String.fromCharCode(96 + parseInt(id)).toUpperCase();

    let updatedPlaceholder = [...placeholder];
    let found = false;

    wordToGuess.split("").forEach((l, index) => {
      if (l === letter) {
        updatedPlaceholder[index] = letter;
        found = true;
      }
    });
    setPlaceholder(updatedPlaceholder);

    // Update key state
    const updatedKeys = keystate.map(k =>
      k.id === id ? { ...k, status: found ? "correct" : "wrong" } : k
    );
    setKeystate(updatedKeys);

    if (updatedPlaceholder.join("") === wordToGuess) {
      console.log("You won!");
      setHaswon(true);
      party.confetti(document.body);
      return;
    }

    if (!found) {
      console.log("Letter not found!");
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);

      // Disable language with same id
      setLanguageset(prev =>
        prev.map(lang =>
          lang.id === nextAttempt ? { ...lang, status: false } : lang
        )
      );

      if (nextAttempt >= 8) {
        console.log("You lost!");
        setHaslost(true);
      }
    }
  }

  function restartgame() {
    console.log("Game restarted");
    setHaslost(false);
    setHaswon(false);
    setAttempts(0);
    setLanguageset(languages);
    setKeystate(key);
    const newWord = wordlist[Math.floor(Math.random() * wordlist.length)];
    setWordToGuess(newWord);
    setPlaceholder(Array(newWord.length).fill(""));
  }

  return (
    <>
      <Notice
        restartgame={restartgame}
        haswon={haswon}
        haslost={haslost}
        attempts={attempts}
        removalmsg={removalmsg}
      />
      <Language languages={languageset} />
      <Placeholder
        placeholder={placeholder}
        haslost={haslost}
        wordToGuess={wordToGuess}
      />
      {!haslost && <Keyboard keystate={keystate} handlekeypress={handlekeypress} />}
    </>
  );
}
