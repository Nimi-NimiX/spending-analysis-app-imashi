import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Container, DialogContent, TextField, Stack, Typography, Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AddExpenseModal = ({ isOpen, onClose, onDoneAdd, onChange, newExpense }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Container>
        <DialogContent>
          <Stack  sx={{ fontSize: '14px'}}>
            <Typography color="other.textH" variant="subtitle2" mb={3}>
              Add new expense
            </Typography>
            <Box mb={2} sx={{ width: '100%', fontSize: '12px' }}>
              <TextField
                sx={{ width: '100%' }}
                // label="Date"
                type="date"
                name="date"
                value={newExpense.date}
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
                  value={newExpense.category}
                  onChange={onChange}
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value="Groceries">Groceries</MenuItem>
                  <MenuItem value="Medical">Medical</MenuItem>
                  <MenuItem value="Transportation">Transportation</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="UtilityBills">UtilityBills</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Name" name="name" value={newExpense.name} onChange={onChange} />
            </Stack>
            <Box mb={3} sx={{ width: '100%' }}>
              <TextField
                label="Amount(LKR)"
                sx={{ width: '100%' }}
                type="number"
                name="amount"
                value={newExpense.amount}
                onChange={onChange}
              />
            </Box>
            <Box>
              <Stack direction="row" mb={2} justifyContent="flex-end" spacing={2}>
                <Button variant="contained" sx={{ backgroundColor: 'secondary.main', color: 'other.white', fontSize: '0.75rem' }} onClick={onDoneAdd}>
                  Add Expense
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

AddExpenseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDoneAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  newExpense: PropTypes.object.isRequired,
};

export default AddExpenseModal;
