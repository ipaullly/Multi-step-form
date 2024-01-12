import React from 'react'
import { ValidationSchema } from '../../schema/formSchema'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { RedBar } from '../FirstForm';

import './index.css'
import { FormControl, TextField } from '@mui/material';

interface InputProps {
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDateVal: (args: Dayjs | null) => void;
  setEndDateVal: (args: Dayjs | null) => void;
}

const SecondForm: React.FC<InputProps> = ({ 
  register, 
  errors, 
  startDate, 
  endDate,
  setStartDateVal,
  setEndDateVal
}) => {
  return (
    <div className='second__form'>
      <RedBar />
      <FormControl sx={{ width: 300 }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDateVal(newValue)}
        />
        {/* <label htmlFor="start-date">Start Date:</label>
        <input 
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          type="date" 
          id="start-date"  
          {...register("startDate")} 
        /> */}
        {errors.startDate && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.startDate?.message}
          </p>
        )}
        </FormControl>
        <RedBar />
        <FormControl sx={{ width: 300 }}>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDateVal(newValue)}
        />
        {/* <label htmlFor="end-date">End Date:</label>
        <input 
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          type="date" 
          id="end-date" 
          {...register("endDate")} 
        /> */}
         {errors.endDate && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.endDate?.message}
          </p>
        )}
        </FormControl>
        <RedBar />
      <div>
        Duration 20th Jan - 30th April
      </div>
      <RedBar />
      <FormControl sx={{ width: 300 }}>
        <TextField
          id="outlined-number"
          label="Target"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="title"
        >
          Target
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          id="title"
          type="number"
          {...register("target")} 
          placeholder="1,200"
        /> */}
         {errors.target && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.target?.message}
          </p>
        )}
      </FormControl>
      <RedBar />
      <RedBar />
    </div>
  )
}

export default SecondForm