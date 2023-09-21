import React from "react";
import moment from 'moment';

function getRange(startDate, endDate) {
   if (startDate > endDate) return [];
   const range = [];
   for (let date = startDate; date <= endDate; date += 24*3600*1000) {
      range.push(date);
   }
   return range;
}

function getWeeks(range) {
   const result = [];
   for (const date of range) {
      const day = moment(date);
      if (day.format('d') === '1') {
         result.push([]);
      }
      result[result.length - 1].push(day);
   }
   return result;
}

function Calendar({date}) {
   const startDay = date.clone().startOf('month').startOf('week').valueOf();
   const endDay = date.clone().endOf('month').endOf('week').valueOf();
   const range = getRange(startDay, endDay);
   const weeks = getWeeks(range);
   const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
   const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май','Июнь','Июль', 'Август', 'Сентябрь','Октябрь','Ноябрь','Декабрь'];

   function getClassName(d) {
      if (d.format('M') !== date.format('M')) {
        return 'ui-datepicker-other-month';
      }
      if (d.format('D') === date.format('D')) {
        return 'ui-datepicker-today';
      }
   }

   return (
      <div className="ui-datepicker">
         <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{days[date.format('d')]}</div>
            <div className="ui-datepicker-material-date">
               <div className="ui-datepicker-material-day-num">{date.format('D')}</div>
               <div className="ui-datepicker-material-month">{date.format('M') === '3' || date.format('M') === '8' ? months[date.format('M') - 1] + 'a' : months[date.format('M') - 1].slice(0, -1) + 'я'}</div>
               <div className="ui-datepicker-material-year">{date.format('Y')}</div>
            </div>
         </div>
         <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
               <span className="ui-datepicker-month">{months[date.format('M') - 1]}</span>&nbsp;<span className="ui-datepicker-year">{date.format('Y')}</span>
            </div>
         </div>
         <table className="ui-datepicker-calendar">
            <colgroup>
               <col />
               <col />
               <col />
               <col />
               <col />
               <col className="ui-datepicker-week-end" />
               <col className="ui-datepicker-week-end" />
            </colgroup>
            <thead>
               <tr>
               <th scope="col" title="Понедельник">Пн</th>
               <th scope="col" title="Вторник">Вт</th>
               <th scope="col" title="Среда">Ср</th>
               <th scope="col" title="Четверг">Чт</th>
               <th scope="col" title="Пятница">Пт</th>
               <th scope="col" title="Суббота">Сб</th>
               <th scope="col" title="Воскресенье">Вс</th>
               </tr>
            </thead>
            <tbody>
               {weeks.map((week, ind) => (
                  <tr key={ind}>
                     {week.map(d => (
                        <td key={d.format('d')} className={getClassName(d)}>{d.format('D')}</td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

export default Calendar;