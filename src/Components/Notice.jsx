import { removalmsg } from "../Data/data"; // adjust path as needed

export default function Notice(prop) {
  // Determine current removal message
  const removalMessage =
    prop.attempts > 0 && prop.attempts <= removalmsg.length
      ? removalmsg[prop.attempts - 1].message
      : "";

  return (
    <>
      <div className="noticebox item-box">
        <div className="notice-box-1">
          <h1>Assembly: Endgame</h1>
          <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </div>

        <div className={prop.haswon || prop.haslost ? "notice-box-2-state" : "notice-box-2-normal"}>
          {prop.haswon && (
            <button className="win-button" onClick={() => prop.restartgame()}>
              🎉 You Win! Play Again
            </button>
          )}

          {prop.haslost && (
            <button className="lose-button" onClick={() => prop.restartgame()}>
              😢 You Lose! Play Again
            </button>
          )}

          {!prop.haswon && !prop.haslost && (
            <p>{prop.attempts === 0 ? "Start guessing the word!" : removalMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}
