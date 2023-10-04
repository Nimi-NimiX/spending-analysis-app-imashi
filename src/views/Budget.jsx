import { Alert, Box, Container, IconButton, LinearProgress, MenuItem, Snackbar, Stack, TextField, Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddExpenseModal from '../components/Forms/AddExpense';
import AddIncomeModal from '../components/Forms/AddIncome';
import {Button, Card, CardContent, Grid, Typography,} from '@mui/material';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

export const BudgetingPage = () => {
    /* add-expense related use states */
    const [expenses, setExpenses] = useState([]);
    const [isAddExpenseModalOpen, setIsAddExpenseModelOpen] = useState(false);
    const [newExpense, setnewExpense] = useState({
      date: '',
      category: '',
      name: '',
      amount: '',
      id: undefined,
    });
    /* add-income related use states */
    const [incomes, setIncomes] = useState([]);
    const [isAddIncomeModalOpen, setIsAddIncomeModelOpen] = useState(false);
    const [newIncome, setnewIncome] = useState({
      date: '',
      name: '',
      amount: '',
      id: undefined,
    });
    /* use states belongs to budget setting part are below */ 
    // const currentMonth = getMonth(Date());
    const [currentDate, setCurrentDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [budgetAmount, setBudgetAmount] = useState(0);
    const [isBudgetSaved, setIsBudgetSaved] = useState(false);
    /* snackbar related usestate */
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarSeverity, setSnackBarSeverity] = useState('warning');
    const [snackBarMsg, setSnackBarMsg] = useState('Estimated budget');

    const getCurrentDate = () => {
      const currentDate = new Date(); 
      const formattedDate = format(currentDate, 'EEE, MMM d');
      setCurrentDate(formattedDate);
    }

    const retrieveBudgetInCache = () => {
      const budget = localStorage.getItem('budget') || 0;
      const month = localStorage.getItem('month') || '';
      setSelectedMonth(month);
      setBudgetAmount(budget);
      setSnackBarMsg(`You've set RS. ${budgetAmount} as the budget for ${selectedMonth}! 🎯`);
    }

    // runs only in first render
    useEffect(() => {
      getCurrentDate();
      retrieveBudgetInCache();
      const isBudgetSet = localStorage.getItem('isBudgetSaved')
      if(isBudgetSet) {
        setIsBudgetSaved(true);
      }
      // Load expenses from local storage when the component renders
      const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
      setExpenses(storedExpenses);

      // load incomes from local storage to set the use state
      const storedIncomes = JSON.parse(localStorage.getItem('incomes')) || [];
      setIncomes(storedIncomes);
    },[snackBarMsg]);
    
 /* methods belongs to adding a new expense are below */ 
    const onAddExpense = (newExpense) => {
      newExpense.amount = parseInt(newExpense.amount); // convert amount to an integer
      newExpense.id = uuidv4(); // add unique id
  
      //add new expense to the top of the array
      const newArr = [newExpense, ...expenses];
  
      localStorage.setItem('expenses', JSON.stringify(newArr))
      setExpenses(newArr)
    }
  
    const handleAddExpense = () => {
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
  }

  const handleAddIncome = () => {
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

  /* functions belongs to budget setting part are below */ 
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudgetAmount(event.target.value);
  };

  const saveBudgetInCache = () => {
    localStorage.setItem('budget', budgetAmount);
    localStorage.setItem('month', selectedMonth);
    localStorage.setItem('isBudgetSaved', true);
  }

  const handleSaveBudget = () => {
    // Check if both month and budget amount are entered
    if (selectedMonth && budgetAmount) {
        // display success alert
        setSnackBarMsg(`You've set RS. ${budgetAmount} as the budget for ${selectedMonth}! 🎯`);
        setSnackBarSeverity('success')
        handleOpenSnackBar();
        // save budget in local storage
        setSelectedMonth(selectedMonth);
        setBudgetAmount(budgetAmount);
        saveBudgetInCache();

        // Set budget saved state to show success icon
        setIsBudgetSaved(true);
    } else {
        // display warning alert 
        setSnackBarMsg('Please enter both month and budget amount! ⚠')
        handleOpenSnackBar('warning')
    }
  };

  const handleEditBudget = () => {
    setIsBudgetSaved(false); // Set budget saved state to show the form again
  };

  /* snackbar related functions */ 
  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

    return (
        <Container style={{ paddingRight: '80px', paddingLeft: '80px'}}>
            <Typography variant='h6' sx={{ color: 'other.textP', textAlign: 'left', background: 'primary.light'}}>It's {currentDate}</Typography>
            {isBudgetSaved? (
                     <Typography variant='body2' sx={{ color: 'other.textP', textAlign: 'left', background: 'primary.light'}}>{snackBarMsg}</Typography>
            ): null}
            <Card sx={{ marginTop: 3, marginBottom: 3, backgroundColor: 'primary.light'}} elevation={2}>
                {isBudgetSaved ? (
                    <>
                    <Box mb={2}>
                        <Box mt={5}>
                            <AdsClickIcon sx={{ color: 'primary.light', width: 100, height: 100,}}/>
                        </Box>
                        <Box mt={2}  style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Box>
                                <Typography variant='caption'>Change budget</Typography>
                                <IconButton onClick={handleEditBudget}><EditIcon  sx={{ color: 'primary.main', width: 15, height: 15,}}/></IconButton>
                            </Box>
                        </Box>
                    </Box>
                    </> 
                ) : (
                <>
                <CardContent sx={{ color: 'other.textP', padding: '20px', paddingLeft: '90px', paddingRight: '90px', marginBottom: '20px'}}>
                    <Typography variant="subtitle2" gutterBottom mb={5} mt={2} sx={{ color: 'other.textP'}}>
                        Set Estimated Budget
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            fullWidth
                            label="Select Month"
                            select
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            >
                            {months.map((month, index) => (
                                <MenuItem key={index} value={month}>
                                {month}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            fullWidth
                            label="Enter Budget Amount"
                            type="number"
                            value={budgetAmount}
                            onChange={handleBudgetChange}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={3} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="contained" sx={{color:"other.white"}} onClick={handleSaveBudget}>
                            Save Budget
                        </Button>
                    </Box>
                    </CardContent>
                </>
                )}
            </Card>
            <Typography variant='body2' mb={2} sx={{ color: 'other.textP', textAlign: 'left', background: 'primary.light'}}>Track your incomes & expenses to see how you achieve the target!</Typography>
            <Stack direction='row' justifyContent='center'>
                <Tooltip title="Add expense"><IconButton onClick={handleAddExpense}><RemoveCircleIcon sx={{ width: 70, height: 70, color: 'secondary.main', cursor: 'pointer' }}  /></IconButton></Tooltip>
                <Tooltip title="Add income"><IconButton onClick={handleAddIncome}><AddCircleIcon sx={{width: 70, height: 70, color: 'primary.main', cursor: 'pointer'}} /></IconButton></Tooltip>
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

            {/* snackbar  */}
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity={snackBarSeverity} sx={{ width: '100%' }}>
                 {snackBarMsg}
                </Alert>
            </Snackbar>
        </Container>
    )
}