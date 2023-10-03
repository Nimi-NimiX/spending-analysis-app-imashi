import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Container, DialogContent, TextField, Stack, Typography, Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const EditExpenseModal = ({ isOpen, onClose, onDoneEdit, onChange, editedData }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Container>
        <DialogContent>
          <Stack sx={{ fontSize: '14px'}}>
            <Typography color="other.textH" variant="subtitle2" mb={4}>
              Edit expense details
            </Typography>
            <Box mb={2} sx={{ width: '100%' }}>
              <TextField
                sx={{ width: '100%' }}
                label="Date"
                type="date"
                name="date"
                value={editedData.date}
                onChange={onChange}
              />
            </Box>
            <Stack direction="row" mb={2} spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  label="Category"
                  name="category"
                  value={editedData.category}
                  onChange={onChange}
                >
                  <MenuItem value="Groceries">Groceries</MenuItem>
                  <MenuItem value="Medical">Medical</MenuItem>
                  <MenuItem value="Transportation">Transportation</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="UtilityBills">UtilityBills</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Name" name="name" value={editedData.name} onChange={onChange} />
            </Stack>
            <Box mb={3} sx={{ width: '100%' }}>
              <TextField
                label="Amount(LKR)"
                sx={{ width: '100%' }}
                type="number"
                name="amount"
                value={editedData.amount}
                onChange={onChange}
              />
            </Box>
            <Box>
              <Stack direction="row" mb={2} justifyContent="flex-end" spacing={2}>
                <Button variant="contained" sx={{ backgroundColor: 'primary.main', color: 'other.white', fontSize: '0.75rem'  }} onClick={onDoneEdit}>
                  Done
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#999494', color: 'other.white', fontSize: '0.75rem'  }} onClick={onClose}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </Container>
    </Dialog>
  );
};

EditExpenseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDoneEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  editedData: PropTypes.object.isRequired,
};

export default EditExpenseModal;
