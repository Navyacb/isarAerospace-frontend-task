import {createContext} from 'react'

export interface ISpectrumData{
    velocity: number,
    altitude: number,
    temperature: number,
    statusMessage: string,
    isAscending: boolean,
    isActionRequired: boolean,
}

interface ISpectrumDataType{
    spectrumData : ISpectrumData,
    spectrumDataDispatch : React.Dispatch<{
        type: string,
        payload: any,
    }>,
}

export const initialSpectrumData: ISpectrumData = {
    velocity: 0,
    altitude: 0,
    temperature: 0,
    statusMessage: '',
    isAscending: false,
    isActionRequired: false,
  }
  
export const SpectrumDataContext = createContext<ISpectrumDataType>({
    spectrumData : initialSpectrumData,
    spectrumDataDispatch : ()=>{},
})                                                                                                                                                                                                                                                                                                                                                                          