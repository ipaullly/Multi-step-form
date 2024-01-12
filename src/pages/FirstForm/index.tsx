import React from 'react'
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ValidationSchema } from '../../schema/formSchema';
import { Box, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';

import './index.css'
import { Itag } from '../FormComponent';

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
  // handleTagsChange: (args: SelectChangeEvent<string[]>) => void;
  tags: "" | string[] | undefined;
  setTags: (args: string[]) => void;
  setValue: UseFormSetValue<ValidationSchema>;
  tagNames: Itag[];
  control: Control<ValidationSchema> | undefined;
  errors: FieldErrors<ValidationSchema>;
  assignee: string;
}

export function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: 'rgba(255, 255, 255)',
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
  setValue,
  setTags,
  tags,
  control,
  tagNames
}) => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { width: '40ch' },
      }}
    >
      <RedBar />
      <FormControl sx={{ width: 300 }}>
        <TextField 
          required
          id="title-field"
          label="Title"
          defaultValue="Hello World"
          margin='normal'
        />
      </FormControl>
      <RedBar />
      <FormControl sx={{ width: 300 }}>
        <TextField 
          label="Description" 
          id="description-field" 
          margin="normal" 
          multiline
        />
      </FormControl>
      <RedBar />
      {/* <TagInputField 
        register={register}
        errors={errors}
      /> */}
      
      <FormControl sx={{ width: 300 }}>
        {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              {...field}
              multiple
              value={field.value}
              onChange={(e) => { 
                console.log('tags',e.target)
              }}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              <MenuItem value=''>Select tags</MenuItem>
              {tagNames.map(({name, id}) => (
                <MenuItem key={id} value={name}>
                  <Checkbox checked={tags?.includes(name)} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          )}
        /> */}
        <InputLabel id="demo-multiple-checkbox-label">Tag(s)</InputLabel>
        <Controller
          render={({field}) => (
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-mutiple-chip"
              multiple
              fullWidth
              {...field}
              // variant="outlined"
              input={<OutlinedInput label="Tag" />}
              value={tags}
              onChange={(event: SelectChangeEvent<string[]>) => {
                setTags(event.target.value as string[]);
                console.log('tags', event.target.value)
                setValue("tags", event.target.value as string[]);
              }}
              renderValue={selected => (
                <div style={{marginRight: '15px'}}>
                  {(selected as string[]).map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {tagNames.length > 0 && tagNames.map(mi => (
                <MenuItem key={mi.id} value={mi.name}>
                  {mi.name}
                </MenuItem>
              ))}
            </Select>
          )}
          name="tags"
          control={control}
        />
        {errors?.tags && (
          <p className="text-xs italic text-red-500 mt-2">
            {'Enter at least one tag'}
          </p>
        )}
      </FormControl>
      <RedBar />
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
        <Controller
          control={control}
          name="assignee"
          render={({ field }) => (
            // <ReactDatePicker
            //   onChange={onChange} // send value to hook form
            //   onBlur={onBlur} // notify when input is touched/blur
            //   selected={value}
            // />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...field}
              value={field.value}
              label="Assignee"
              onChange={(e) => field.onChange(e.target.value as string)}
            >
              <MenuItem value={'john'}>John</MenuItem>
              <MenuItem value={'powell'}>Powell</MenuItem>
              <MenuItem value={'luke'}>Luke</MenuItem>
            </Select>
           )}
         />
      </FormControl>
      <RedBar />
      <RedBar />
    </Box>
  )
}

export default FirstForm