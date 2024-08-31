import React, { useEffect, useState } from 'react';
import TopBarComponet from './TopBarComponet';
import { checkAuth } from '../redux/userSlice';
import { fetchbills, postBillData, updateBillData, deleteBillData } from '../redux/billSlice';
import { fetchBuildings } from '../redux/BuildingSlice';
import { DataGrid } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import calculateBill from '../Helper.js';

function BillComponent() {
    const dispatch = useDispatch();
    const { billData = [], status, error } = useSelector((state) => state.bills);
    const { buildingData = [] } = useSelector((state) => state.buildings);

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(fetchbills());
        dispatch(fetchBuildings());
    }, [dispatch]);

    const [selectedBill, setSelectedBill] = useState(null);
    const [building, setBuilding] = useState('');
    const [month, setMonth] = useState('');
    const [previousReading, setPreviousReading] = useState('');
    const [currentReading, setCurrentReading] = useState('');
    const [unitsConsumed, setUnitsConsumed] = useState('');
    const [billAmount, setBillAmount] = useState('');

    const handleBuildingChange = (event) => {
        setBuilding(event.target.value);
    };

    const handleMeterChange = (event) => {
        // If you have meter-specific logic, handle it here
    };

    useEffect(() => {
        if (previousReading && currentReading) {
            if (Number(previousReading) <= Number(currentReading)) {
                const [calculatedUnits, calculatedAmount] = calculateBill(previousReading, currentReading);
                setUnitsConsumed(calculatedUnits);
                setBillAmount(calculatedAmount);
            } else {
                toast.error("Previous Reading should be less than or equal to Current Reading");
                setUnitsConsumed('');
                setBillAmount('');
            }
        }
    }, [previousReading, currentReading]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'Meter', headerName: 'Meter', width: 150 },
        { field: 'Month', headerName: 'Month', width: 150 },
        { field: 'PreviousReading', headerName: 'Previous Reading', width: 200 },
        { field: 'CurrentReading', headerName: 'Current Reading', width: 200 },
        { field: 'UnitsConsumed', headerName: 'Units Consumed', width: 200 },
        { field: 'BillAmount', headerName: 'Bill Amount', width: 200 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        },
    ];

    const rows = billData.map((bill) => ({
        id: bill.id,
        Meter: bill.meter || 'Unknown',
        Month: new Date(bill.month).toLocaleDateString() || 'Unknown',
        PreviousReading: bill.previous_reading || 'Unknown',
        CurrentReading: bill.current_reading || 'Unknown',
        UnitsConsumed: bill.units_consumed || 'Unknown',
        BillAmount: bill.bill_amount || 'Unknown',
    }));

    const handleEdit = (id) => {
        const bill = billData.find(b => b.id === id);
        setSelectedBill(bill);
        setBuilding(bill.meter || '');
        setMonth(bill.month || '');
        setPreviousReading(bill.previous_reading || '');
        setCurrentReading(bill.current_reading || '');
        setUnitsConsumed(bill.units_consumed || '');
        setBillAmount(bill.bill_amount || '');
    };

    const handleDelete = (id) => {
        dispatch(deleteBillData(id))
            .unwrap()
            .then(() => {
                toast.success('Bill deleted successfully!');
            })
            .catch(() => {
                toast.error('Failed to delete bill!');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBill = {
            meter: building,            
            month,
            previous_reading: previousReading,
            current_reading: currentReading,
            units_consumed: unitsConsumed,
            bill_amount: billAmount,
        };

        if (selectedBill) {
            dispatch(updateBillData({ id: selectedBill.id, updatedBill: newBill }))
                .unwrap()
                .then(() => {
                    toast.success('Bill updated successfully!');
                    setSelectedBill(null);
                    clearForm();
                    dispatch(fetchbills());
                })
                .catch(() => {
                    toast.error('Failed to update bill!');
                });
        } else {
            dispatch(postBillData(newBill))
                .unwrap()
                .then(() => {
                    toast.success('Bill added successfully!');
                    clearForm();
                    dispatch(fetchbills());
                })
                .catch(() => {
                    toast.error('Failed to add bill!');
                });
        }
    };

    const clearForm = () => {
        setBuilding('');
        setMonth('');
        setPreviousReading('');
        setCurrentReading('');
        setUnitsConsumed('');
        setBillAmount('');
    };

    return (
        <>
            <TopBarComponet />
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={3} justifyContent="center" component="form" noValidate autoComplete="off">
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" disabled={!buildingData.length}>
                                <InputLabel id="building-label">Building / Meter</InputLabel>
                                <Select
                                    labelId="building-label"
                                    id="building"
                                    value={building}
                                    onChange={handleBuildingChange}
                                    label="Building / Meter">
                                    {buildingData.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="month"
                                label="Month"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={month}
                                onChange={e => setMonth(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="previous-reading"
                                label="Previous Reading"
                                type="number"
                                variant="outlined"
                                value={previousReading}
                                onChange={e => setPreviousReading(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="current-reading"
                                label="Current Reading"
                                type="number"
                                variant="outlined"
                                value={currentReading}
                                onChange={e => setCurrentReading(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="units-consumed"
                                label="Units Consumed"
                                type="number"
                                variant="outlined"
                                disabled
                                value={unitsConsumed}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="bill-amount"
                                label="Bill Amount"
                                type="number"
                                variant="outlined"
                                disabled
                                value={billAmount}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                                {selectedBill ? 'Update Bill' : 'Add Bill'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </Box>
            </Container>
        </>
    );
}

export default BillComponent;
