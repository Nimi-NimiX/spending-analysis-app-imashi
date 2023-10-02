import * as React from 'react';
// import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Delete, Edit } from '@mui/icons-material';

const IncomeItemCard = (data) => {
    return (
        <Box sx={{"&:hover": {backgroundColor: 'primary.light',},}} paddingX='5px' paddingY='5px' borderRadius='2%'>
            <Grid container spacing={2} color='other.textH' textAlign='left'>
                <Grid item md={2.5}><Box><Typography variant='caption'>{data.date}</Typography></Box></Grid>
                <Grid item md={3}><Box><Typography variant='caption'>{data.category}</Typography></Box></Grid>
                <Grid item md={2.5}><Box><Typography variant='caption'>{data.name}</Typography></Box></Grid>
                <Grid item md={2.5}><Box><Typography variant='caption'>{data.amount}</Typography></Box></Grid>
                <Grid item md={1.5}>
                    <Stack direction='row' justifyContent='flex-end' spacing={1}>
                        <Edit onClick={()=> {console.log('edit btn clicked')}} sx={{width: 20, height: 20, color: 'orange'}}/>
                        <Delete onClick={()=> {console.log('delete btn clicked')}} sx={{width: 20, height: 20, color: 'red'}}/>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

export default IncomeItemCard;