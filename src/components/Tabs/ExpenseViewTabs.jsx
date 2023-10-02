import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpensesList from '../Lists/ExpenseList';
import { Button, Container, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ExpenseViewTabs = ({data, onAddExpense}) => {
  const propData = data;
  const [value, setValue] = React.useState(0);
  const [isAddModalOpen, setIsAddModelOpen] = React.useState(false);
  const [newExpense, setnewExpense] = React.useState({
    date: '',
    category: '',
    name: '',
    amount: '',
  });
  const [expenses, setExpenses] = React.useState(propData);

  const handleAddExpense = () => {
      console.log('expense added')
    setIsAddModelOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModelOpen(false);
  };

  const handleDoneAdd = () => {
    console.log('onAddExpense:', newExpense);
    onAddExpense(newExpense);
    setIsAddModelOpen(false);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewExpense((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs className='expenses-tab' value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Daily" {...a11yProps(0)} />
            <Tab label="Weekly" {...a11yProps(1)} />
            <Tab label="Monthly" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Stack>
            <ExpensesList expData={expenses} />
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Stack>
      <Stack direction='row' justifyContent='flex-end'>
        <AddCircleIcon sx={{ width: 30, height: 30, color: 'secondary.main', cursor: 'pointer' }} onClick={handleAddExpense} />
      </Stack>

      {/* Add Expense Modal */}
      <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
        <Container sx={{marginY: '20px'}}>
            <DialogContent>
                <Stack>
                    <Typography color='other.textH' variant='h5' mb={4}>Edit expense details</Typography>
                    <Box mb={2} sx={{ width: '100%' }}><TextField
                        sx={{width: '100%'}}
                        label="Date"
                        type="date"
                        name="date"
                        value={newExpense.date}
                        onChange={handleInputChange}
                    /></Box>
                    <Stack direction='row'  mb={2} spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                labelId="category-label"
                                label="Category"
                                name="category"
                                value={newExpense.category}
                                onChange={handleInputChange}
                                >
                                  <MenuItem value="" disabled>
                                    Select Category
                                  </MenuItem>
                                  <MenuItem value="Transportation">Transportation</MenuItem>
                                  <MenuItem value="Groceries">Groceries</MenuItem>
                                  <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Name"
                                name="name"
                                value={newExpense.name}
                                onChange={handleInputChange}
                            />
                    </Stack>
                    <Box mb={3} sx={{width: '100%'}}>
                        <TextField
                        label="Amount(LKR)"
                        sx={{width: '100%'}}
                        type="number"
                        name="amount"
                        value={newExpense.amount}
                        onChange={handleInputChange}
                    />
                    </Box>
                    <Box><Stack direction='row'  mb={2} justifyContent='flex-end' spacing={2}>
                        <Button variant='contained' sx={{backgroundColor: 'primary.main', color: 'other.white'}} onClick={handleDoneAdd}>Add Expense</Button>
                        <Button variant='contained' sx={{backgroundColor: '#999494', color: 'other.white'}} onClick={handleCloseAddModal}>Cancel</Button>
                    </Stack></Box>
                </Stack>
            </DialogContent>
        </Container>
      </Dialog>
    </Box>
  );
}


ExpenseViewTabs.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
}

export default ExpenseViewTabs;
