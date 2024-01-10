import React from 'react'
import TagInputField from '../components/TagInputField'

const FirstForm = () => {
  return (
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
        />
      </div>
      <div className="m-3">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="desc"
        >
          Description
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          id="desc"
          type="text"
          placeholder="The world ever after"
        />
      </div>
      <div>
        <TagInputField />
      </div>
    </div>
  )
}

export default FirstForm