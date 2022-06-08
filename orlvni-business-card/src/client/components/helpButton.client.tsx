export default function HelpButton(helpText) {
  return (
    <>
      <button
        onClick={() => {
          alert(helpText);
        }}
      >
        Помощь
      </button>
      <hr />
    </>
  );
}
