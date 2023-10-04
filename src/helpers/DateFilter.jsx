import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, lastDayOfMonth } from 'date-fns';
import formatDate from './DateFormater';

const DateFilter = (expenses, type) => {
      const today =  new Date();
      const formatedToday = formatDate(Date());
      const previousMonday = startOfWeek(today, { weekStartsOn: 1 }); // Find the previous Monday before toda
      const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 1 }); // The end of the week for today
      const startOfCurrentMonth = startOfMonth(today); // The start of the month for today
      const endOfCurrentMonth = lastDayOfMonth(today); // The last day of the month for today
      console.log('\n day', formatedToday, '\n week', formatDate(previousMonday), formatDate(endOfCurrentWeek), '\n month: ', formatDate(startOfCurrentMonth), formatDate(endOfCurrentMonth))
  
      const daily = expenses.filter(expense => expense.date === formatedToday);
  
      const weekly = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return startOfDay(expenseDate) >= previousMonday && endOfDay(expenseDate) <= endOfCurrentWeek;
      });
  
      const monthly = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return startOfDay(expenseDate) >= startOfCurrentMonth && endOfDay(expenseDate) <= endOfCurrentMonth;
      });
  
      // return the data according to the time period 
      if (type === 'daily') {
        return daily;
      } else if (type === 'weekly') {
        return weekly;
      } else if (type === 'monthly') {
        return monthly;
      }
}

const getStartAndEndDatesOfCurrentMonth = () => {
    const today =  new Date();
    const startOfCurrentMonth = startOfMonth(today); // The start of the month for today
    const endOfCurrentMonth = lastDayOfMonth(today); // The last day of the month for today
    return {
        start: formatDate(startOfCurrentMonth),
        end: formatDate(endOfCurrentMonth)
    }
}

export {DateFilter, getStartAndEndDatesOfCurrentMonth};