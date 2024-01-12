import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SecondForm from '../SecondForm';
import PreviousBtn from '../../components/PreviousBtn';
import NextBtn from '../../components/NextBtn';
import TagInputField from '../../components/TagInputField';
import { 
  FormComponentProps, 
  ValidationSchema, 
  validationSchema 
} from '../../schema/formSchema';
import { Button, SelectChangeEvent } from '@mui/material';
import FirstForm from '../FirstForm';

import './index.css'
import dayjs, { Dayjs } from 'dayjs';

export type Itag = {
  id: number,
  name: string
}

const names = [
  {
    id: 0,
    name: 'red'
  },
  {
    id: 1,
    name: 'blue'
  },
  {
    id: 2,
    name: 'yellow'
  }
];

const FormComponent: React.FC<FormComponentProps> = ({ tab, setTab }) => {

  const [age, setAge] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagNames, setTagNames] = React.useState<Itag[]>(names);

  const [startDateVal, setStartDateVal] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [endDateVal, setEndDateVal] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    console.log('tags value', tags);
    console.log('tag options', tagNames);
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: validationSchema.parse({
      // Your values here
      title: 'dog',
      assignee: 'john',
      tags: tags,
      startDate: new Date(),
      endDate: new Date(),
      target: 5
    }),
  });

  React.useEffect(() => {
    const subscription = watch((value, options) =>
      console.log('watch',value, options)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log('form submit',data)
  };

  const First = () => (
    <div className='flex flex-col'>
      <div className="m-3">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Narnia"
          {...register("title")} 
        />
        {errors.title && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.title?.message}
          </p>
        )}
      </div>
      <div className="m-3">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="desc"
        >
          Description
        </label>
        <textarea
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          id="desc"
          placeholder="The world ever after"
          {...register("description")} 
        />
      </div>
      <div className='m-3'>
        <TagInputField 
          register={register}
          errors={errors}
        />
      </div>
      <div className="m-3">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="assignee"
        >
          Assignee
        </label>
        <select
          id="assignee" 
          className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
          {...register('assignee', { required: true } )}
        >
          <option value="0">Select assignee:</option>
          <option value="1">Audi</option>
          <option value="2">BMW</option>
          <option value="3">Citroen</option>
          <option value="4">Ford</option>
          <option value="5">Honda</option>
          <option value="6">Jaguar</option>
          <option value="7">Land Rover</option>
          <option value="8">Mercedes</option>
          <option value="9">Mini</option>
          <option value="10">Nissan</option>
          <option value="11">Toyota</option>
          <option value="12">Volvo</option>
        </select>
        {errors?.assignee && (
          <p className="text-xs italic text-red-500 mt-2">
            {'Please select an assignee'}
          </p>
        )}
      </div>
    </div>
  )

  return (
    <div className='flex flex-col w-3/4'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
      >
        {
          tab === 0
          ? (
            <FirstForm 
              register={register}
              errors={errors}
              assignee={age}
              handleAssigneeChange={handleAssigneeChange}
              tags={tags}
              tagNames={tagNames}
              control={control}
              setTags={setTags}
              setValue={setValue}
            />
          ):(
            <SecondForm 
              register={register}
              errors={errors}
              startDate={startDateVal}
              endDate={endDateVal}
              setStartDateVal={setStartDateVal}
              setEndDateVal={setEndDateVal}
            />
          )
        }
        {
          tab === 0
          ? (
            <div className='first__form_btns'>
              <NextBtn setTab={setTab}/>
            </div>
          ) : (
            <div className='second__form_btns'>
              <PreviousBtn setTab={setTab} /> 
              {/* <button 
                type='submit'
                className="submit__btn"
              >
                Submit
              </button> */}
              <Button 
                type="submit"
                variant="contained"
              >Submit</Button>
            </div>
          )
        }
      </form>
    </div>
  )
}

export default FormComponent