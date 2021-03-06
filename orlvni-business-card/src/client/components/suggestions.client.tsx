import { useEffect, useState } from 'react';

export default function Suggestions({ children }) {
  const [sugData, setSugData] = useState(null);
  const [host, setHost] = useState('');
  const [cookies, setCookies] = useState(null);

  useEffect(
    () => setHost(`${window.location.protocol}//${window.location.host}`),
    [],
  );
  useEffect(
    () =>
      setCookies(
        Object.fromEntries(
          new URLSearchParams(document.cookie.replace(/; /g, '&')),
        ),
      ),
    [],
  );

  // async function fetchSugData() {
  //   const resSuggest = await fetch(`${host}/server/suggest`);
  //   const suggestionsData = await resSuggest.json();
  //   if (!suggestionsData) {
  //     alert('Что-то пошло не так, попробуйте еще раз');
  //   }
  //   suggestionsData.sort((a, b) => {
  //     return Date.parse(b.sug_date) - Date.parse(a.sug_date);
  //   });

  //   setSugData({
  //     suggestions: suggestionsData,
  //   });
  // }

  // useEffect(() => {
  //   fetchSugData();
  // }, []);

  async function sendSug(event) {
    event.preventDefault();
    event.target.submit.disabled = true;
    const regex = new RegExp('[\'"]');
    if (
      !regex.exec(event.target.sug_text.value) &&
      event.target.sug_text.value.trim() !== ''
    ) {
      const response = await fetch(`${host}/server/suggest`, {
        method: 'post',
        body: JSON.stringify({
          user_id: cookies.user_id,
          sug_text: event.target.sug_text.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      switch (data.message) {
        case 'success':
          alert('Спасибо за обратную связь');
          break;
        case 'denied':
          alert('Что-то пошло не так, попробуйте еще раз');
          break;
      }
      event.target.sug_text.value = '';
      // fetchSugData();
      event.target.submit.disabled = false;
    } else {
      event.target.submit.disabled = false;
      alert('Кавычки вида \' и " нельзя вводить');
    }
  }

  return (
    <>
      <div className="suggestions">
        <form action="submit" onSubmit={sendSug}>
          <label htmlFor="sug_text">Введите пожелания для проекта:</label>
          <br />
          <textarea
            name="sug_text"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <button type="submit" name="submit">
            Отправить
          </button>
        </form>
        {children}
      </div>
    </>
  );
}
