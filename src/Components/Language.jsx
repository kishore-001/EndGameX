export default function Language(prop) {
  const languagelist = prop.languages.map((lang) => {
    return (
      <div
        key={lang.id}
        className={`language-box-item ${!lang.status ? "language-removed" : ""}`}
      >
        {lang.name}
      </div>
    );
  });

  return (
    <>
      <div className="languagebox item-box">
        {languagelist}
      </div>
    </>
  );
}
