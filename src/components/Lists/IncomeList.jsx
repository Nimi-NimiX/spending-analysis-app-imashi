import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { FormControl, Grid, InputLabel, List, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import IncomeItemCard from '../Cards/IncomeItemCard';
import ListItem from '@mui/material/ListItem';
import RestoreIcon from '@mui/icons-material/Restore';
import { DateFilter } from '../../helpers/DateFilter';

const ListContainer = styled(Paper)(({ theme }) => ({
  padding: 20,
}));

const IncomesList = ({type}) => {

  const [incomes, setIncomes] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const fetchDataFromCache = () => {
    const storedIncomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const timelyData = DateFilter(storedIncomes, type);
    setSearchResults(timelyData);
    setIncomes(timelyData);
  }

  // runs only on the first render
  useEffect(() => {
    fetchDataFromCache();
  }, []);

  // runs everytime when incomes array get updated
  useEffect(() => {
    const storedIncomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const timelyData = DateFilter(storedIncomes, type);
    setSearchResults(timelyData);
  }, [incomes])

  const handleDelete = (incomeId) => {
    const remainingIncomes = incomes.filter((income) => income.id !== incomeId);
    localStorage.setItem('incomes', JSON.stringify(remainingIncomes))
    setIncomes(remainingIncomes);
  };

  const handleEdit = (editedIncome) => {
    setIncomes((prevIncomes) => {
      const updatedIncomes = prevIncomes.map((income) => {
        // replace the Incomes map with the new incomes that satisfies the below condition
        return income.id === editedIncome.id ? editedIncome : income;
      });
      localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
      
      return updatedIncomes;
    });
  };

  /* methods belongs to filter functionality are below */
  const onChange = (e) => {
    setFilterCategory(e.target.value);
    // replace incomes array with the filtered results
    const filteredData = incomes.filter(income => income.name.includes(e.target.value));
    if(filteredData.length === 0) {
      setNoResultsFound(true);
    } else {
      setNoResultsFound(false);
    }
    setSearchResults(filteredData)
  }

  return (
    <Box sx={{ width: '100%'}}>
      {incomes.length === 0? 
      <>
        <Box sx={{ marginTop: 3, marginBottom: 3 }}>
          <Typography variant='caption'>The incomes you add will appear here</Typography>
        </Box>
      </>
      : 
      <>
        <>
          {/* filter dropdown */}
          <Stack direction="row" justifyContent='flex-end' mb={2} spacing={2} sx={{}}>
                <FormControl fullWidth>
                  <TextField 
                    label="Search"
                    value={filterCategory}
                    onChange={onChange}>
                  </TextField>
                </FormControl>
              </Stack>
        </>
        <ListContainer>
        {noResultsFound
        ?
          <>
            <Box sx={{ marginTop: 3, marginBottom: 3 }}>
              <Typography variant='caption'>No incomes found under {filterCategory} category</Typography>
            </Box>
          </>
        : 
        <>
          {/* list heading */}
          <Grid container spacing={0} color='other.textP' textAlign='left' fontSize='0.75rem' paddingLeft='5px'>
            <Grid item xs={2} md={3}><Box><Typography variant='subtitle2'>Date</Typography></Box></Grid>
            <Grid item xs={3} md={4}><Box><Typography variant='subtitle2'>Income mode</Typography></Box></Grid>
            <Grid item xs={2} md={3}><Box><Typography variant='subtitle2'>Amount(LKR)</Typography></Box></Grid>
            <Grid item xs={2} md={2}></Grid>
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
                  {searchResults.map((income) => (
                    <ListItem  key={income.id} style={{ cursor: 'pointer', paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
                      <IncomeItemCard
                        key={income.id}
                        data={income}
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

export default IncomesList;