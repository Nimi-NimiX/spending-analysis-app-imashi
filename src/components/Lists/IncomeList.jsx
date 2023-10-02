import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import IncomeItemCard from '../Cards/IncomeItemCard';

const ListContainer = styled(Paper)(({ theme }) => ({
  padding: 20,
}));

const IncomeList = () => {
  const data1 = { date: '07/02/2023', category: 'Groceries', name: 'Bread', amount: '350' };
  const data2 = { date: '07/02/2023', category: 'Transportation', name: 'Taxi', amount: '1000' };
  const data3 = { date: '07/02/2023', category: 'Other', name: 'tution fee', amount: '10000' };

  return (
    <Box sx={{ width: '100%'}}>
      <ListContainer>
        {/* table heading */}
        <Grid container spacing={1} color='other.textP' textAlign='left' paddingLeft='5px' mb={1}>
                <Grid item xs={2.5}><Box><Typography variant='subtitle2'>Date</Typography></Box></Grid>
                <Grid item xs={3}><Box><Typography variant='subtitle2'>Category</Typography></Box></Grid>
                <Grid item xs={2.5}><Box><Typography variant='subtitle2'>Name</Typography></Box></Grid>
                <Grid item xs={2.5}><Box><Typography variant='subtitle2'>Amount(LKR)</Typography></Box></Grid>
                <Grid item xs={1.5}></Grid>
        </Grid>
        {/* list items */}
        <Stack spacing={1}>
          <IncomeItemCard {...data1}/>
          <IncomeItemCard {...data2}/>
          <IncomeItemCard {...data3}/>
        </Stack>
      </ListContainer>
    </Box>
  );
}

export default IncomeList;