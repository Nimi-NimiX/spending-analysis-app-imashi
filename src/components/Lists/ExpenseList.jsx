import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Grid, List, Typography } from '@mui/material';
import ExpenseItemCard from '../Cards/ExpenseItemCard';
import ListItem from '@mui/material/ListItem';

const ListContainer = styled(Paper)(({ theme }) => ({
  padding: 20,
}));

const ExpensesList = ({expData}) => {

  let expenseData = expData;
  console.log('prop', expData)
  const [expenses, setExpenses] = React.useState([]);

  React.useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || expenseData;
    setExpenses(storedExpenses);
    console.log('inside expense list', storedExpenses, 'el', expenses)
  }, []);

  const handleDelete = (expenseId) => {
    const remainingExpenses = expenses.filter((expense) => expense.id !== expenseId);
    localStorage.setItem('expenses', JSON.stringify(remainingExpenses))
    setExpenses(remainingExpenses);
  };

  const handleEdit = (editedExpense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.map((expense) => {
        // replace the expenses map with the new expenses that satisfies the below condition
        return expense.id === editedExpense.id ? editedExpense : expense;
      });
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      console.log('soon when edited', updatedExpenses, expenses)
      
      return updatedExpenses;
    });
  };

  return (
    <Box sx={{ width: '100%'}}>
      {expenses.length === 0? 
      <>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant='caption'>Add your expenses here</Typography>
        </Box>
      </>
      : 
      <>
        <ListContainer>
        {/* list heading */}
        <Grid container spacing={0} color='other.textP' textAlign='left' fontSize='0.75rem' paddingLeft='5px'>
          <Grid item xs={2} md={2.4}><Box><Typography variant='subtitle2'>Date</Typography></Box></Grid>
          <Grid item xs={3} md={3}><Box><Typography variant='subtitle2'>Category</Typography></Box></Grid>
          <Grid item xs={3} md={3.1}><Box><Typography variant='subtitle2'>Name</Typography></Box></Grid>
          <Grid item xs={2} md={1.5}><Box><Typography variant='subtitle2'>Amount(LKR)</Typography></Box></Grid>
          <Grid item xs={2} md={2.1}></Grid>
        </Grid>
        <List
          sx={{
            width: '100%',
            minWidth: '100%',
            overflow: 'auto',
            maxHeight: 260,
            paddingY: 0,
            '& ul': { padding: 0 },
          }}
        >
            {/* <ul style={{padding: 0}}> */}
                {expenses.map((expense) => (
                // <li style={{padding: 0}}  key={expense.id} >
                  <ListItem  key={expense.id} style={{ cursor: 'pointer', paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                    <ExpenseItemCard
                      key={expense.id}
                      data={expense}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  </ListItem>
                // </li>
                ))}
            {/* </ul> */}
        </List>
      </ListContainer>
      </>}
    </Box>
  );
}

export default ExpensesList;