import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { ValidationSchema } from "../../schema/formSchema";
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import "./index.css";
import { Itag } from "../FormComponent";
import { assignees, checkFormErrors } from "../../utils/reusables";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface FirstFormProps {
  handleAssigneeChange: (args: SelectChangeEvent) => void;
  register: UseFormRegister<ValidationSchema>;
  tags: string[] | undefined;
  setTags: (args: string[]) => void;
  setValue: UseFormSetValue<ValidationSchema>;
  tagNames: Itag[];
  control: Control<ValidationSchema> | undefined;
  errors: FieldErrors<ValidationSchema>;
  clearErrors: UseFormClearErrors<ValidationSchema>;
  setFirstFormErrors: (args: [] | string[]) => void;
  assignee: string;
}

export function RedBar() {
  return (
    <Box
      sx={{
        height: 30,
        backgroundColor: "rgba(255, 255, 255)",
      }}
    />
  );
}

const FirstForm: React.FC<FirstFormProps> = ({
  // register,
  errors,
  // handleAssigneeChange,
  // assignee,
  // handleTagsChange,
  setFirstFormErrors,
  setValue,
  setTags,
  clearErrors,
  tags,
  control,
  tagNames,
}) => {
  const [assigneeArray, ] = React.useState<Itag[]>(assignees);
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
        name={"title"}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl sx={{
            width: { 
              xs: 250,
              md: 400,
              lg: 600
            }
          }}>
            <TextField
              helperText={error ? error.message : null}
              error={!!error}
              onChange={(e) => {
                const newErrorsArr = checkFormErrors(errors, 'first');
                setFirstFormErrors(newErrorsArr);
                onChange(e.target.value)
              }}
              value={value}
              label="Title"
              margin="normal"
              variant="outlined"
              style={{
                width: "100%",
              }}
            />
          </FormControl>
        )}
      />
      <RedBar />
      <FormControl sx={{
        width: { 
          xs: 250,
          md: 400,
          lg: 600
        }
      }}>
        <TextField
          label="Description"
          id="description-field"
          margin="normal"
          style={{
            width: "100%",
          }}
          multiline
        />
      </FormControl>
      <RedBar />
      <Controller
        render={({ field, fieldState: { error } }) => (
          <FormControl sx={{
            width: { 
              xs: 250,
              md: 400,
              lg: 600
            }
          }}>
            <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              {...field}
              value={tags}
              onFocus={() => {
                clearErrors("tags");
                const newErrorsArr = checkFormErrors(errors, 'first');
                setFirstFormErrors(newErrorsArr);
              }}
              onChange={(event: SelectChangeEvent<string[]>) => {
                console.log('tags', (event.target.value as string[]).map(item => item+''))
                const arrTag = (event.target.value as string[]).map((item: number|string) => item +'')
                setTags(event.target.value as string[]);
                setValue("tags", arrTag as [string, ...string[]]);
              }}
              input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: string) => (
                    <Chip key={value} label={tagNames[Number(value)].name} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {tagNames.length > 0 &&
                tagNames.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText
              sx={{
                color: "error.main",
              }}
            >
              {error?.message ?? ""}
            </FormHelperText>
          </FormControl>
        )}
        name="tags"
        control={control}
      />
      <RedBar />
      <Controller
        control={control}
        name="assignee"
        render={({ field, fieldState: { error } }) => (
          <FormControl 
            sx={{
              width: { 
                xs: 250,
                md: 400,
                lg: 600
              }
            }}
          >
            <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...field}
              value={field.value}
              label="Assignee"
              onChange={(e) => {
                field.onChange(`${e.target.value}` as string)
              }}
              onBlur={() => {
                const newErrorsArr = checkFormErrors(errors, 'first');
                setFirstFormErrors(newErrorsArr);
              }} 
            >
              <MenuItem value={""}>Select assignee</MenuItem>
              {assigneeArray.length > 0 &&
                assigneeArray.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText
              sx={{
                color: "error.main",
              }}
            >
              {error?.message ?? ""}
            </FormHelperText>
          </FormControl>
        )}
      />
      <RedBar />
      <RedBar />
    </Box>
  );
};

export default FirstForm;
