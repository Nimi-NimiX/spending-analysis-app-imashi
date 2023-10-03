import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Container, DialogContent, TextField, Stack, Typography, Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AddIncomeModal = ({ isOpen, onClose, onDoneAdd, onChange, newIncome }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Container>
        <DialogContent>
          <Stack  sx={{ fontSize: '14px'}}>
            <Typography color="other.textH" variant="subtitle2" mb={3}>
              Add new Income
            </Typography>
            <Box mb={2} sx={{ width: '100%', fontSize: '12px' }}>
              <TextField
                sx={{ width: '100%' }}
                // label="Date"
                type="date"
                name="date"
                value={newIncome.date}
                onChange={onChange}
              />
            </Box>
            <Stack direction="row" mb={2} spacing={2}>
              <TextField label="Name" name="name" value={newIncome.name} onChange={onChange} />
            </Stack>
            <Box mb={3} sx={{ width: '100%' }}>
              <TextField
                label="Amount(LKR)"
                sx={{ width: '100%' }}
                type="number"
                name="amount"
                value={newIncome.amount}
                onChange={onChange}
              />
            </Box>
            <Box>
              <Stack direction="row" mb={2} justifyContent="flex-end" spacing={2}>
                <Button variant="contained" sx={{ backgroundColor: 'primary.main', color: 'other.white', fontSize: '0.75rem' }} onClick={onDoneAdd}>
                  Add Income
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

AddIncomeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDoneAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  newIncome: PropTypes.object.isRequired,
};

export default AddIncomeModal;
