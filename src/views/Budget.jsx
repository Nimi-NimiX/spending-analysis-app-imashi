import { Box, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddExpenseModal from '../components/Forms/AddExpense';
import AddIncomeModal from '../components/Forms/AddIncome';

export const BudgetingPage = () => {
    const [isAddExpenseModalOpen, setIsAddExpenseModelOpen] = React.useState(false);
    const [newExpense, setnewExpense] = React.useState({
      date: '',
      category: '',
      name: '',
      amount: '',
      id: undefined,
    });

    const [expenses, setExpenses] = React.useState([]);
    const [incomes, setIncomes] = React.useState([]);

    const [isAddIncomeModalOpen, setIsAddIncomeModelOpen] = React.useState(false);
    const [newIncome, setnewIncome] = React.useState({
      date: '',
      name: '',
      amount: '',
      id: undefined,
    });

    // runs only in first render
    React.useEffect(() => {
      // Load expenses from local storage when the component renders
      const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
      console.log('expenses from local st: ', storedExpenses)
      setExpenses(storedExpenses);

      // load incomes from local storage to set the use state
      const storedIncomes = JSON.parse(localStorage.getItem('incomes')) || [];
      console.log('incomes from local st: ', storedIncomes)
      setIncomes(storedIncomes);
    },[]);
    
 /* methods belongs to adding a new expense are below */ 
    const onAddExpense = (newExpense) => {
      newExpense.amount = parseInt(newExpense.amount); // convert amount to an integer
      newExpense.id = uuidv4(); // add unique id
  
      //add new expense to the top of the array
      const newArr = [newExpense, ...expenses];
  
      localStorage.setItem('expenses', JSON.stringify(newArr))
      setExpenses(newArr)
      console.log('newly added ex', newExpense, 'new arrr', expenses);
    }
  
    const handleAddExpense = () => {
        console.log('expense added')
      setIsAddExpenseModelOpen(true);
    };
  
    const handleCloseAddExpenseModal = () => {
      setIsAddExpenseModelOpen(false);
    };
  
    const handleDoneAddExpense = () => {
      // Reset the id property to an empty string 
      setnewExpense((prevData) => ({
        ...prevData,
        id: undefined,
      }));
      onAddExpense(newExpense);
      setIsAddExpenseModelOpen(false);
    };
    
  
    const handleExpenseInputChange = (e) => {
      const { name, value } = e.target;
      setnewExpense((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
/* methods belongs to adding a new income are below */ 
const onAddIncome = (newIncome) => {
    newIncome.amount = parseInt(newIncome.amount); // convert amount to an integer
    newIncome.id = uuidv4(); // add unique id

    //add new Income to the top of the array
    const newArr = [newIncome, ...incomes];

    localStorage.setItem('incomes', JSON.stringify(newArr))
    setIncomes(newArr)
    console.log('newly added ex', newIncome, 'new arrr', incomes);
  }

  const handleAddIncome = () => {
      console.log('Income added')
    setIsAddIncomeModelOpen(true);
  };

  const handleCloseAddIncomeModal = () => {
    setIsAddIncomeModelOpen(false);
  };

  const handleDoneAddIncome = () => {
    // Reset the id property to an empty string 
    setnewIncome((prevData) => ({
      ...prevData,
      id: undefined,
    }));
    onAddIncome(newIncome);
    setIsAddIncomeModelOpen(false);
  };
  

  const handleIncomeInputChange = (e) => {
    const { name, value } = e.target;
    setnewIncome((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    return (
        <Box>
            <Box>
                <TextField
                id='outlined-number'
                label='Amount'
                type='number'
                />
            </Box>
            <Stack direction='row' justifyContent='flex-end'>
                <RemoveCircleIcon sx={{ width: 30, height: 30, color: 'secondary.main', cursor: 'pointer' }} onClick={handleAddExpense} />
            </Stack>
            <Stack direction='row' justifyContent='flex-end'>
                <AddCircleIcon sx={{width: 30, height: 30, color: 'primary.main', cursor: 'pointer'}} onClick={handleAddIncome}/>
            </Stack>

            {/* Add Expense Modal */}
            <AddExpenseModal
                isOpen={isAddExpenseModalOpen}
                onClose={handleCloseAddExpenseModal}
                onDoneAdd={handleDoneAddExpense}
                onChange={handleExpenseInputChange}
                newExpense={newExpense}
            />

            {/* Add income modal */}
            <AddIncomeModal
                isOpen={isAddIncomeModalOpen}
                onClose={handleCloseAddIncomeModal}
                onDoneAdd={handleDoneAddIncome}
                onChange={handleIncomeInputChange}
                newIncome={newIncome}
            />
        </Box>
    )
}