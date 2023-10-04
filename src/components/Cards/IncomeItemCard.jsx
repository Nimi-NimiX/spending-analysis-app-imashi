import React, { useState } from 'react';
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { Delete, Edit } from '@mui/icons-material';
import EditIncomeModal from '../Forms/EditIncome';

const IncomeItemCard = ({ data, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  const handleEditIncome = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteIncome = () => {
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
    <Box sx={{width:'100%', "&:hover": {backgroundColor: 'primary.light',},}} paddingX='5px' paddingY='5px' borderRadius='2%'>
      <Grid container spacing={2} color='other.textH' textAlign='left'>
        <Grid item md={3}><Box><Typography variant='caption'>{data.date}</Typography></Box></Grid>
        <Grid item md={4}><Box><Typography variant='caption'>{data.name}</Typography></Box></Grid>
        <Grid item md={3}><Box><Typography variant='caption'>{data.amount}</Typography></Box></Grid>
        <Grid item md={2}>
          <Stack direction='row' justifyContent='flex-end' spacing={1}>
            <IconButton sx={{ backgroundColor: 'primary.light', "&:hover": {backgroundColor: 'other.white'}}} onClick={handleEditIncome}><Edit sx={{width: 16, height: 16, color: 'orange'}}/></IconButton>
            <IconButton sx={{ backgroundColor: 'primary.light', "&:hover": {backgroundColor: 'other.white'}}} onClick={handleDeleteIncome}><Delete sx={{width: 16, height: 16, color: 'red'}}/></IconButton>
          </Stack>
        </Grid>

      </Grid>

      {/* Edit Modal */}
      <EditIncomeModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onDoneEdit={handleDoneEdit}
        onChange={handleInputChange}
        editedData={editedData}
      />
    </Box>
  );
}

export default IncomeItemCard;
