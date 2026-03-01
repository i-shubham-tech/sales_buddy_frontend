import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

export default function DateTextField({setDate}) {
  
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                format="dd/MM/yyyy"
                // value={value}
                onChange={(val)=>setDate(val)}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        error:false,
                        

                    }
                }}
            />

        </LocalizationProvider>
    );
}
