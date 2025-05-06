export default function Notice(prop) {
  return (
    <>
      <div className="noticebox item-box">
        <div className="notice-box-1">
          <h1>Assembly: Endgame</h1>
          <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </div>
        <div className="notice-box-2">
          { prop.haswon && 
          (
            <button className="restart-button" onClick={()=> prop.restartgame()}>
              🎉 You Win! Play Again
            </button>
          )}
         { prop.haslost &&
          (
            <button className="restart-button" onClick={()=> prop.restartgame()}>
              😢 You Lose! Play Again
            </button>
          )}
        </div>
      </div>
    </>
  );
}
