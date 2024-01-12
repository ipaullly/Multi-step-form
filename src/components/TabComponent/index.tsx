import { Box, Tab, Tabs } from '@mui/material';
import React from 'react'

import './index.css'

// Define the prop types for the component
interface TabComponentProps {
  setTab: (args: number) => void;
  tab: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabComponent: React.FC<TabComponentProps> = ({ setTab, tab }) => {

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('tab value', newValue)
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tab} 
          onChange={handleChange} 
          aria-label="form-tabs"
        >
          <Tab label="Step 1" {...a11yProps(0)} />
          <Tab label="Step 2" {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  )
}

export default TabComponent