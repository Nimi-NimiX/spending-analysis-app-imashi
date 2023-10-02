import React, { useState } from 'react';
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Delete, Edit } from '@mui/icons-material';
import EditExpenseModal from '../Forms/EditExpense';
import DeleteConfirmationPopup from '../Forms/DeleteExpense';
// import DeleteConfirmationPopup from '../Forms/DeleteExpense';

const ExpenseItemCard = ({ data, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  const handleEditExpense = () => {
      console.log('item edited')
    setIsEditModalOpen(true);
  };

  const handleDeleteExpense = () => {
      console.log('item deleted', data.id)
       onDelete(data.id); 
    // setSelectedExpenseId(data.id);
    // openDeleteConfirmationModal();
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

  
  /* regarding delete confirmation modal */
  // const [open, setDeleteModalOpen] = React.useState(false);
  // const [selectedExpenseId, setSelectedExpenseId] = React.useState('');

  // const openDeleteConfirmationModal = () => {
  //   setDeleteModalOpen(true);
  // };

  // const closeDeleteConfirmationModal = () => {
  //   setDeleteModalOpen(false);
  // };

  return (
    <Box sx={{width:'100%', "&:hover": {backgroundColor: 'secondary.light',},}} paddingX='5px' paddingY='5px' borderRadius='2%'>
      <Grid container spacing={2} color='other.textH' textAlign='left'>
        <Grid item md={2.3}><Box><Typography variant='caption'>{data.date}</Typography></Box></Grid>
        <Grid item md={3}><Box><Typography variant='caption'>{data.category}</Typography></Box></Grid>
        <Grid item md={3}><Box><Typography variant='caption'>{data.name}</Typography></Box></Grid>
        <Grid item md={2}><Box><Typography variant='caption'>{data.amount}</Typography></Box></Grid>
        <Grid item md={1.7}>
          <Stack direction='row' justifyContent='flex-end' spacing={1}>
            <Edit onClick={handleEditExpense} sx={{width: 20, height: 20, color: 'orange'}}/>
            <Delete onClick={handleDeleteExpense} sx={{width: 20, height: 20, color: 'red'}}/>
          </Stack>
        </Grid>
      </Grid>

      {/* Edit Modal */}
      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onDoneEdit={handleDoneEdit}
        onChange={handleInputChange}
        editedData={editedData}
      />
      {/* Delete Modal */}
      {/* <DeleteConfirmationPopup
        isOpen={open}
        onDelete={onDelete}
        selectedExpenseId={selectedExpenseId}
        onClose={closeDeleteConfirmationModal}
        /> */}
    </Box>
  );
}

export default ExpenseItemCard;
