import React from "react";
import { ValidationSchema } from "../../schema/formSchema";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { RedBar } from "../FirstForm";

import "./index.css";
import { Box, FormControl, TextField } from "@mui/material";
import { checkFormErrors } from "../../utils/reusables";

interface InputProps {
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  control: Control<ValidationSchema> | undefined;
  setStartDateVal: (args: Dayjs | null) => void;
  setSecondFormErrors: (args: [] | string[]) => void;
  selectedStartDate: string | number | Date | Dayjs | undefined;
  clearErrors: UseFormClearErrors<ValidationSchema>;
  rangeDuration: number;
  setValue: UseFormSetValue<ValidationSchema>;
  setEndDateVal: (args: Dayjs | null) => void;
}

const addCommas = (num: string) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = (num: string) => num.toString().replace(/[^0-9]/g, "");

const today = dayjs().toISOString();

const SecondForm: React.FC<InputProps> = ({
  errors,
  control,
  clearErrors,
  setValue,
  selectedStartDate,
  rangeDuration,
  setSecondFormErrors,
}) => {
  const handleOnAccept = () => {
    clearErrors("startDate");
    const newErrorsArr = checkFormErrors(errors, "second");
    setSecondFormErrors(newErrorsArr);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root": { width: "100%" },
      }}
    >
      <RedBar />
      <Controller
        control={control}
        name="startDate"
        render={({ field, fieldState: { error } }) => (
          <FormControl
            sx={{
              width: {
                xs: 250,
                md: 400,
                lg: 600,
              },
            }}
          >
            <DatePicker
              label="Start Date"
              defaultValue={today}
              disablePast
              {...field}
              autoFocus={false}
              value={dayjs(field.value)}
              slotProps={{
                textField: {
                  error: !!error?.message,
                  helperText: error?.message,
                },
              }}
              className="date-input"
              onChange={(
                date: string | number | Date | Dayjs | null | undefined
              ) => {
                setValue("startDate", dayjs(date).toISOString());
              }}
              onAccept={() => {
                handleOnAccept();
              }}
            />
          </FormControl>
        )}
      />
      <RedBar />
      <Controller
        control={control}
        name="endDate"
        render={({ field, fieldState: { error } }) => (
          <FormControl
            sx={{
              width: {
                xs: 250,
                md: 400,
                lg: 600,
              },
            }}
          >
            <DatePicker
              label="End Date"
              minDate={selectedStartDate}
              autoFocus={false}
              {...field}
              value={dayjs(field.value)}
              slotProps={{
                textField: {
                  error: !!error?.message,
                  helperText: error?.message,
                },
              }}
              onAccept={() => {
                clearErrors("endDate");
                const newErrorsArr = checkFormErrors(errors, "second");
                setSecondFormErrors(newErrorsArr);
              }}
              onChange={(
                date: string | number | Date | Dayjs | null | undefined
              ) => {
                setValue("endDate", dayjs(date).toISOString());
              }}
            />
          </FormControl>
        )}
      />
      <RedBar />
      <FormControl
        sx={{
          width: {
            xs: 250,
            md: 400,
            lg: 600,
          },
        }}
      >
        <TextField
          id="outlined-read-only-input"
          label="Duration"
          value={`${rangeDuration ? rangeDuration : 0} days`}
          InputProps={{
            readOnly: true,
          }}
        />
      </FormControl>
      <RedBar />
      <Controller
        name={"target"}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl
            sx={{
              width: {
                xs: 250,
                md: 400,
                lg: 600,
              },
            }}
          >
            <TextField
              helperText={error ? error.message : null}
              error={!!error}
              onChange={(e) => {
                console.log("val", e.target.value);
                const value = addCommas(removeNonNumeric(e.target.value));
                const newErrorsArr = checkFormErrors(errors, "second");
                setSecondFormErrors(newErrorsArr);
                onChange(value);
              }}
              value={value ? value : ""}
              fullWidth
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              label="Target"
              variant="outlined"
            />
          </FormControl>
        )}
      />
      <RedBar />
      <RedBar />
    </Box>
  );
};

export default SecondForm;
