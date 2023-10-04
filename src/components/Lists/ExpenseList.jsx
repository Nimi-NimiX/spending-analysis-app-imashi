import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { FormControl, Grid, InputLabel, List, MenuItem, Select, Stack, Typography } from '@mui/material';
import ExpenseItemCard from '../Cards/ExpenseItemCard';
import ListItem from '@mui/material/ListItem';
import RestoreIcon from '@mui/icons-material/Restore';
import DateFilter from '../../helpers/DateFilter';

const ListContainer = styled(Paper)(({ theme }) => ({
  padding: 20,
}));

const ExpensesList = ({type}) => {

  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const expenseCategories = [ 'Groceries', 'Medical', 'Transportation', 'Education', 'UtilityBills', 'Other'];

  const fetchDataFromCache = () => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const timelyData = DateFilter(storedExpenses, type);
    setSearchResults(timelyData);
    setExpenses(timelyData);
  }

  // runs only on the first render
  useEffect(() => {
    fetchDataFromCache();
  }, []);

  // runs everytime when expenses array get updated
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const timelyData = DateFilter(storedExpenses, type);
    setSearchResults(timelyData);
  }, [expenses])

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
      
      return updatedExpenses;
    });
  };

  /* methods belongs to filter functionality are below */
  const onChange = (e) => {
    setFilterCategory(e.target.value);
    // replace expenses array with the filtered results
    const filteredData = expenses.filter(expense => expense.category === e.target.value);
    if(filteredData.length === 0) {
      setNoResultsFound(true);
    } else {
      setNoResultsFound(false);
    }
    setSearchResults(filteredData)
  }

  const restoreList = () => {
    setNoResultsFound(false);
    setFilterCategory('');
    setSearchResults(expenses);
  }

  return (
    <Box sx={{ width: '100%'}}>
      {expenses.length === 0? 
      <>
        <Box sx={{ marginTop: 3, marginBottom: 3 }}>
          <Typography variant='caption'>The expenses you add will appear here</Typography>
        </Box>
      </>
      : 
      <>
        <>
          {/* filter dropdown */}
          <Stack direction="row" justifyContent='flex-end' mb={2} spacing={2} sx={{}}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Filter by</InputLabel>
                  <Select
                    labelId="category-label"
                    label="Category"
                    name="category"
                    value={filterCategory}
                    onChange={onChange}
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    {expenseCategories.map((category) => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box style={{marginTop: '14px'}}><RestoreIcon onClick={restoreList}/></Box>
              </Stack>
        </>
        <ListContainer>
        {noResultsFound
        ?
          <>
            <Box sx={{ marginTop: 3, marginBottom: 3 }}>
              <Typography variant='caption'>No expenses found under {filterCategory} category</Typography>
            </Box>
          </>
        : 
        <>
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
                  {searchResults.map((expense) => (
                    <ListItem  key={expense.id} style={{ cursor: 'pointer', paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                      <ExpenseItemCard
                        key={expense.id}
                        data={expense}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    </ListItem>
                  ))}
          </List>
        </>
        }
      </ListContainer>
      </>}
    </Box>
  );
}

export default ExpensesList;