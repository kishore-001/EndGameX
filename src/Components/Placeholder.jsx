export default function Placeholder(prop) {

  const placeholderlist = prop.placeholder.map((letter, index) => {
    return (
      <div key={index} className="placeholder-box-item">
        <p>{letter}</p>
      </div>
    );
  });

  return (
    <>
      <div className="placeholderbox  ">
        {placeholderlist}
      </div>
    </>
  );
}
