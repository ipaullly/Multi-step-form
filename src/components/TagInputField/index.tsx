import React, { useState } from 'react'
import './index.css'
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ValidationSchema } from '../../schema/formSchema';

interface InputProps {
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
}

const TagInputField: React.FC<InputProps> = ({ register, errors }) => {
  const [tags, setTags] = useState([
    "HTML", "CSS", "JavaScript"
  ]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // If user did not press enter key, return
    if(e.key !== ' ') {
      console.log('not enter')
    } else {
      // Get the value of the input
      const value = (e.target as HTMLInputElement).value
      // If the value is empty, return
      if(!value.trim()) return
      // Add the value to the tags array
      setTags([...tags, value]);
      // Clear the input
      (e.target as HTMLInputElement).value = ''
    }
  }

  function removeTag(index: number){
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
      <div className="tags-input-container">
        { 
          tags.map((tag, index) => (
            <div className="tag-item" key={index}>
              <span className="text">{tag}</span>
              <span className="close" onClick={() => removeTag(index)}>&times;</span>
            </div>
          )) 
        }
        <input 
          type="text" 
          className="tags-input" 
          placeholder="Type somthing" 
          onKeyDown={handleKeyDown}
          {...register("tags")} 
        />
        {errors?.title && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors?.title?.message}
          </p>
        )}
      </div>
  )
}

export default TagInputField