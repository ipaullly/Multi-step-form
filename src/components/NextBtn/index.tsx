import { Button } from '@mui/material';
import React from 'react'

interface BtnProps {
  setTab: (args: number) => void;
}

const NextBtn: React.FC<BtnProps> = ({ setTab }) => {
  return (
    <Button 
      onClick={() => setTab(1)}
      variant="contained"
      color='secondary'
    >Next</Button>
    // <button 
    //   onClick={() => setTab(1)}
    //   className="outline-none px-4 py-2 bg-orange-500"
    // >
    //   Next
    // </button>
  )
}

export default NextBtn