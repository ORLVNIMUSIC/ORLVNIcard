export default function SuggestionsData({ sugData }) {
  return (
    <>
      {sugData.map((elem) => (
        <div key={elem.sug_id}>
          <hr />
          <h5>{elem.sug_text}</h5>
          <p>{elem.sug_date.toString()}</p>
        </div>
      ))}
    </>
  );
}
