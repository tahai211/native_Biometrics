import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

const initialState = {
    accountStatementData: {
        accountNumber: '',
        fromDate: moment(),
        toDate: moment().clone().add(1, 'day')
    }
}

export const accountStatementSlice = createSlice({
    name: 'accountStatement',
    initialState,
    reducers: {
        setAccountStatementData: (state, actions) => {
            state.accountStatementData = { ...state.accountStatementData, ...actions.payload };
        }

    },
})

// Action creators are generated for each case reducer function
export const { setAccountStatementData } = accountStatementSlice.actions

export default accountStatementSlice.reducer