import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpensesList from '../Lists/ExpenseList';
import {  Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddExpenseModal from '../Forms/AddExpense';
import { v4 as uuidv4 } from 'uuid';

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
    id: undefined,
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
    // Reset the id property to an empty string 
    setnewExpense((prevData) => ({
      ...prevData,
      id: undefined,
    }));
    console.log('dldldldd, ', newExpense.id);
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
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onDoneAdd={handleDoneAdd}
        onChange={handleInputChange}
        newExpense={newExpense}
      />
    </Box>
  );
}


ExpenseViewTabs.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
}

export default ExpenseViewTabs;
