export default function Keyboard(prop) {
  const keyboardlist = prop.keystate.map((key) => {
    let extraClass = "";
    if (key.status === "correct") extraClass = " key-green";
    else if (key.status === "wrong") extraClass = " key-red";

    return (
      <div
        key={key.id}
        className={`keyboard-box-item ${extraClass}`}
        onClick={() => prop.handlekeypress(key.id)}
      >
        {key.name}
      </div>
    );
  });

  return (
    <div className="keyboardbox">
      {keyboardlist}
    </div>
  );
}
