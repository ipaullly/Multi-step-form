import { useState } from 'react'
import TabComponent from './components/TabComponent'
import FormComponent from './pages/FormComponent'

import './index.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// type IFormData = {
//   id: string
//   title: string
//   description?: string
//   tags: string[]
//   assignee: string
//   start_date: string
//   end_date: string
//   target: number
// }


function App() {
  const [tab, setTab] = useState<number>(0);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='landing'>
        <h2 className='title'>MultiForm SPA</h2>
        <TabComponent 
          setTab={setTab}
          tab={tab}
        />
        <FormComponent 
          tab={tab} 
          setTab={setTab}
        />
      </div>
    </LocalizationProvider>
  )
}

export default App
