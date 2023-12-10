import React,{ useReducer } from 'react';
import { Container } from '@mui/material';
import { RouterLinks } from './RouterLinks';
import styles from './App.module.css'
import { SpectrumDataContext, ISpectrumData, initialSpectrumData} from './state-management/SpectrumDataContext';

function App() {

  const spectrumDataReducer = (state:ISpectrumData,action:{ type: string, payload: any})=>{
    switch(action.type){
      case 'UPDATE_DATA':
        console.log('1')
        return {...action.payload}
      default: 
      return state
    }
  }

  const [spectrumData,spectrumDataDispatch] = useReducer(spectrumDataReducer,initialSpectrumData)

  return (
    <SpectrumDataContext.Provider value={{spectrumData,spectrumDataDispatch}}>
      <Container className={`${styles.container} ${styles.width}`}>
        <RouterLinks/>
      </Container>
    </SpectrumDataContext.Provider>
  )
}

export default App;
