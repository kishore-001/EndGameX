export default function Language(prop) {
  const languagelist = prop.languages.map((lang) => {
    return (
      <div
        key={lang.id}
        className={`language-box-item ${!lang.status ? "language-removed" : ""}`}
        style={{
          backgroundColor: lang.status ? lang.color : "#555555",
        }}
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
