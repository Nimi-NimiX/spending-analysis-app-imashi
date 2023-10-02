import React, { useState } from 'react';
import { Box, Grid, Stack, Typography, Button, Dialog, DialogContent, TextField, Select, MenuItem, InputLabel, FormControl, Container } from "@mui/material";
import { Delete, Edit } from '@mui/icons-material';

const ExpenseItemCard = ({ data, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

    const handleEdit = () => {
      console.log('item edited')
    setIsEditModalOpen(true);
  };

    const handleDelete = () => {
      console.log('item deleted', data.id)
    onDelete(data.id); 
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDoneEdit = () => {
    // Update the state data
    onEdit(editedData);
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{width:'100%', "&:hover": {backgroundColor: 'secondary.light',},}} paddingX='5px' paddingY='5px' borderRadius='2%'>
      <Grid container spacing={2} color='other.textH' textAlign='left'>
        <Grid item md={2.3}><Box><Typography variant='caption'>{data.date}</Typography></Box></Grid>
        <Grid item md={3}><Box><Typography variant='caption'>{data.category}</Typography></Box></Grid>
        <Grid item md={3}><Box><Typography variant='caption'>{data.name}</Typography></Box></Grid>
        <Grid item md={2}><Box><Typography variant='caption'>{data.amount}</Typography></Box></Grid>
        <Grid item md={1.7}>
          <Stack direction='row' justifyContent='flex-end' spacing={1}>
            <Edit onClick={handleEdit} sx={{width: 20, height: 20, color: 'orange'}}/>
            <Delete onClick={handleDelete} sx={{width: 20, height: 20, color: 'red'}}/>
          </Stack>
        </Grid>
      </Grid>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <Container sx={{marginY: '20px'}}>
            <DialogContent>
                <Stack>
                    <Typography color='other.textH' variant='h5' mb={4}>Edit expense details</Typography>
                    <Box mb={2} sx={{ width: '100%' }}><TextField
                        sx={{width: '100%'}}
                        label="Date"
                        type="date"
                        name="date"
                        value={editedData.date}
                        onChange={handleInputChange}
                    /></Box>
                    <Stack direction='row'  mb={2} spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                labelId="category-label"
                                label="Category"
                                name="category"
                                value={editedData.category}
                                onChange={handleInputChange}
                                >
                                <MenuItem value="Transportation">Transportation</MenuItem>
                                <MenuItem value="Groceries">Groceries</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Name"
                                name="name"
                                value={editedData.name}
                                onChange={handleInputChange}
                            />
                    </Stack>
                    <Box mb={3} sx={{width: '100%'}}>
                        <TextField
                        label="Amount(LKR)"
                        sx={{width: '100%'}}
                        type="number"
                        name="amount"
                        value={editedData.amount}
                        onChange={handleInputChange}
                    />
                    </Box>
                    <Box><Stack direction='row'  mb={2} justifyContent='flex-end' spacing={2}>
                        <Button variant='contained' sx={{backgroundColor: 'primary.main', color: 'other.white'}} onClick={handleDoneEdit}>Done</Button>
                        <Button variant='contained' sx={{backgroundColor: '#999494', color: 'other.white'}} onClick={handleCloseEditModal}>Cancel</Button>
                    </Stack></Box>
                </Stack>
            </DialogContent>
        </Container>
      </Dialog>
    </Box>
  );
}

export default ExpenseItemCard;
