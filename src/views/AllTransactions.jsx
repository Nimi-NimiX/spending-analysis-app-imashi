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
  const data = [];
  const [expenses, setExpenses] = React.useState(data);

  // runs only in first render
  React.useEffect(() => {
    // Load expenses from local storage when the component renders
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || data;
    console.log('from local st: ', storedExpenses)
    setExpenses(storedExpenses);
  },[]);
  

  const onAddExpense = (newExpense) => {
    newExpense.amount = parseInt(newExpense.amount); // convert amount to an integer
    newExpense.id = uuidv4(); // add unique id

    //add new expense to the top of the array
    const newArr = [newExpense, ...expenses];

    localStorage.setItem('expenses', JSON.stringify(newArr))
    setExpenses(newArr)
    console.log('newly added ex', newExpense, 'new arrr', expenses);
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
