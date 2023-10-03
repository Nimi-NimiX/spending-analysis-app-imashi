import * as React from 'react';
import { useEffect , useState} from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Stack, Typography } from '@mui/material';
import IncomeViewTabs from '../components/Tabs/IncomeViewTabs';
import ExpenseViewTabs from '../components/Tabs/ExpenseViewTabs';

const ListContainer = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.light,
  padding: 20,
}));

const AllTransactions = () => {
  const [expenses, setExpenses] = useState([]);

  // runs only in first render
  useEffect(() => {
    // Load expenses from local storage when the component renders
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  },[]);
  
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
                  <ExpenseViewTabs data={expenses}/>
                </ListContainer>
            </Stack>
          </Grid>
      </Grid>
    </Box>
  );
}

export default AllTransactions;
