import React from 'react'

// Define the prop types for the component
interface TabComponentProps {
  setTab: (args: number) => void;
  tab: number
}

const TabComponent: React.FC<TabComponentProps> = ({ setTab, tab }) => {
  return (
    <div className='flex flex-row items-center'>
      <button 
        onClick={() => setTab(0)}
        className={`
          ${tab === 0? 'active__btn':'default__btn'}
        `}
      >
        Step 1
      </button>
      <button 
        onClick={() => setTab(1)}
        className={`
          ${tab === 1? 'active__btn':'default__btn'}
        `}
      >
        Step 2
      </button>
    </div>
  )
}

export default TabComponent