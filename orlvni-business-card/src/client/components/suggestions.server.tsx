import dayjs from 'dayjs';
import _ from 'lodash';
import moment from 'moment';

export default function SuggestionsData({ sugData }) {
  return (
    <>
      {sugData.map((elem) => (
        <div key={elem.sug_id}>
          <hr />
          <h5>{elem.sug_text}</h5>
          <p>
            {moment(dayjs(elem.sug_date.toString()).toString()).format(
              'MMMM Do YYYY, h:mm:ss a',
            )}
          </p>
        </div>
      ))}
    </>
  );
}
