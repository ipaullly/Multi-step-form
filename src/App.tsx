import { useState } from 'react'
import TabComponent from './components/TabComponent'
import FormComponent from './pages/FormComponent'

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
    <div className='bg-blue-100 text-center w-full h-screen flex flex-col items-center'>
      <h2 className='m-3 underline text-2xl'>MultiForm SPA</h2>
      <TabComponent 
        setTab={setTab}
        tab={tab}
      />
      <FormComponent tab={tab}/>
    </div>
  )
}

export default App
