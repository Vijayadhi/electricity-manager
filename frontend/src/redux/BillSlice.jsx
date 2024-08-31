// billSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch bills
export const fetchbills = createAsyncThunk(
    'bills/fetchbills',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://127.0.0.1:8000/bills/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Post a new bill
export const postBillData = createAsyncThunk(
    'bills/postBillData',
    async (newBill, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post('http://127.0.0.1:8000/bills/', newBill, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update a bill
export const updateBillData = createAsyncThunk(
    'bills/updateBillData',
    async ({ id, updatedBill }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(`http://127.0.0.1:8000/bills/${id}/`, updatedBill, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Delete a bill
export const deleteBillData = createAsyncThunk(
    'bills/deleteBillData',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://127.0.0.1:8000/bills/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const billSlice = createSlice({
    name: 'bills',
    initialState: {
        billData: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchbills.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchbills.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.billData = action.payload;
            })
            .addCase(fetchbills.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(postBillData.fulfilled, (state, action) => {
                state.billData.push(action.payload);
            })
            .addCase(updateBillData.fulfilled, (state, action) => {
                const index = state.billData.findIndex(bill => bill.id === action.payload.id);
                if (index !== -1) {
                    state.billData[index] = action.payload;
                }
            })
            .addCase(deleteBillData.fulfilled, (state, action) => {
                state.billData = state.billData.filter(bill => bill.id !== action.payload);
            });
    }
});

export default billSlice.reducer;
