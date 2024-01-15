import { Box, Tab, Tabs } from '@mui/material';
import React from 'react'

import './index.css'

// Define the prop types for the component
interface TabComponentProps {
  setTab: (args: number) => void;
  tab: number,
  firstFormErrors: string[]|[],
  secondFormErrors: string[]|[],
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabComponent: React.FC<TabComponentProps> = ({ 
  setTab, 
  tab,
  firstFormErrors,
  secondFormErrors
}) => {

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
          <Tab 
            label={
              firstFormErrors.length > 0
              ? <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <span
                    style={{
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      padding: '5px 10px',
                      color: 'white',
                      marginRight: '10px'
                    }}
                  >{firstFormErrors.length}</span>
                  <span>Step 1</span>
                </div> 
              : <span>Step 1</span>
            } 
            {...a11yProps(0)} 
          />
          <Tab
            label={
              secondFormErrors.length > 0
              ? <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <span
                    style={{
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      padding: '5px 10px',
                      color: 'white',
                      marginRight: '10px'
                    }}
                  >{secondFormErrors.length}</span>
                  <span>Step 2</span>
                </div> 
              : <span>Step 2</span>
            } 
          {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  )
}

export default TabComponent