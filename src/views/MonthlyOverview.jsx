import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';

export default function CalendarComponent() {
    const [date, setDate] = useState('2023-04-02');

    useEffect(() => {
        const formatedDate = formateDate(Date())
        setDate(formatedDate);
        console.log('\n\ndate: ', date, 'dkd', formatedDate);
    }, []);

    const formateDate = (inputDate) => {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0');
      
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateCalendar',
        ]}
      >
        <DemoItem>
          <DateCalendar defaultValue={dayjs(date)} readOnly/>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
