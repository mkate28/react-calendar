import Calendar from './Calendar';
import moment from 'moment';
import './App.css';

function App() {
  moment.updateLocale('ru', {week: {dow: 1}});
  const now = moment();
  return (
    <Calendar date={now} />
  );
}

export default App;