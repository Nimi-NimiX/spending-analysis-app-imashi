import * as React from 'react';
import { useEffect , useState} from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Stack, Typography } from '@mui/material';
import IncomeViewTabs from '../components/Tabs/IncomeViewTabs';
import ExpenseViewTabs from '../components/Tabs/ExpenseViewTabs';
import { getStartAndEndDatesOfCurrentMonth } from '../helpers/DateFilter';
import { format } from 'date-fns';

const ListContainer = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.light,
  padding: 20,
}));

const AllTransactions = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateString, setStartDateString] = useState('');
  const [endDateString, setEndDateString] = useState('');

  const changeDateFormat = (date) => {
    const currentDate = new Date(date); 
    const formattedDate = format(currentDate, 'EEE, MMM d');
    return formattedDate;
  }

  useEffect(() => {
    const {start, end } = getStartAndEndDatesOfCurrentMonth();
    setStartDate(start);
    setEndDate(end);
    setStartDateString(changeDateFormat(start));
    setEndDateString(changeDateFormat(end));
  }, [])

  return (
    <Box sx={{ flexGrow: 1, paddingTop: '15px' }}>
      <Typography variant='subtitle2' mb={2} textAlign='left' color='other.textP'>All Transactions from <b>{startDate}</b> to <b>{endDate}</b> ({startDateString} - {endDateString})</Typography>
      <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item md={5} xs={12}>
            <Stack>
              <Typography variant='h6' color='other.textP' textAlign='left' fontSize='1rem' mb={1}>Incomes</Typography>
                <ListContainer sx={{backgroundColor: 'primary.light'}}>
                    <IncomeViewTabs/>
                </ListContainer>
            </Stack>
          </Grid>
          <Grid item md={7} xs={12}>
            <Stack>
                <Typography variant='h6' color='other.textP' textAlign='left' fontSize='1rem' mb={1}>Expenses</Typography>
                <ListContainer sx={{backgroundColor: 'secondary.light'}}>
                  <ExpenseViewTabs/>
                </ListContainer>
            </Stack>
          </Grid>
      </Grid>
    </Box>
  );
}

export default AllTransactions;
