import { Button } from '@mui/material';
import React from 'react'

interface BtnProps {
  setTab: (args: number) => void;
}

const PreviousBtn: React.FC<BtnProps> = ({ setTab }) => {
  return (
    <Button 
      onClick={() => setTab(0)}
      variant="contained"
      color='secondary'
    >Back</Button>
    // <button 
    //     onClick={() => setTab(0)}
    //     className="outline-none px-4 py-2 bg-orange-500 text-white"
    //   >
    //     Back
    //   </button>
  )
}

export default PreviousBtn