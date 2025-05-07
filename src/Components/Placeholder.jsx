export default function Placeholder(prop) {
  let placeholderlist = [];
  if(!prop.haslost){
      placeholderlist = prop.placeholder.map((letter, index) => {
      return (
        <div key={index} className="placeholder-box-item">
          <p>{letter}</p>
        </div>
      );
    });
  }
  else{
    placeholderlist = prop.wordToGuess.split("").map((letter, index) => {
      return (
        <div key={index} className="placeholder-box-item-wrong">
          <p>{letter}</p>
        </div>
      );
    });
  }

  return (
    <>
      <div className="placeholderbox">
        {placeholderlist}
      </div>
    </>
  );
}
