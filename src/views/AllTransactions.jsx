import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Stack, Typography } from '@mui/material';
import IncomeViewTabs from '../components/Tabs/IncomeViewTabs';
import ExpenseViewTabs from '../components/Tabs/ExpenseViewTabs';
import { v4 as uuidv4 } from 'uuid';

const ListContainer = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.light,
  padding: 20,
}));

const AllTransactions = () => {
  let arr = [];

  const data = [
    { id: '1', date: '2023-10-05', category: 'Groceries', name: 'Bread', amount: 350 },
    { id: '2', date: '2023-10-06', category: 'Transportation', name: 'Taxi', amount: 1000 },
    { id: '3', date: '2023-10-07', category: 'Other', name: 'Tuition fee', amount: 10000 },
  ]

  const [expenses, setExpenses] = React.useState(data);

  // runs only in first render
  React.useEffect(() => {
    // Load expenses from local storage when the component renders
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || data;
    console.log('from local st: ', storedExpenses)
    setExpenses(storedExpenses);
  },[]);


  const onAddExpense = (newExpense) => {
    newExpense.id = uuidv4(); // add unique id
    newExpense.amount = parseInt(newExpense.amount); // convert amount to an integer
    console.log('new exp', newExpense)
    arr = expenses
    arr.unshift(newExpense);
    setExpenses(arr)
    console.log('newly added ex', newExpense, expenses, 'arrr', arr);
    // localStorage.setItem('expenses', JSON.stringify([arr, ...expenses]))
    localStorage.setItem('expenses', JSON.stringify(arr))
  }


  return (
    <Box sx={{ flexGrow: 1, paddingTop: '15px' }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item md={6} xs={12}>
          <Stack>
              <Typography variant='h6' color='other.textP' textAlign='left' fontSize='1rem' mb={1}>Income</Typography>
                <ListContainer sx={{backgroundColor: 'primary.light'}}>
                    <IncomeViewTabs/>
                </ListContainer>
            </Stack>
          </Grid>
        <Grid item md={6} xs={12}>
            <Stack>
              <Typography variant='h6' color='other.textP' textAlign='left' fontSize='1rem' mb={1}>Expenses</Typography>
                <ListContainer sx={{backgroundColor: 'secondary.light'}}>
                  <ExpenseViewTabs data={expenses} onAddExpense={onAddExpense} />
                </ListContainer>
            </Stack>
          </Grid>
      </Grid>
    </Box>
  );
}

export default AllTransactions;
