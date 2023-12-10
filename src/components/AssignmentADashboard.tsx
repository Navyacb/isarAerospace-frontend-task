import { useQuery } from 'react-query';
import {useContext} from 'react'
import axios from 'axios';
import {Paper, Typography, Button,Alert, Grid} from '@mui/material'
import { SpectrumDataContext } from '../state-management/SpectrumDataContext';
import {ISpectrumData} from '../state-management/SpectrumDataContext'
import { SpectrumLineChart } from './SpectrumLineChart';
import styles from './AssignmentADashboard.module.css'

export const AssignmentADashboard = ()=>{
    const {spectrumDataDispatch} = useContext(SpectrumDataContext)

    const fetchSpectrumData = async () => {
        try{
            const response = await axios.get('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus')
            return response.data
        }
        catch(error){
            console.log('Error while fetching data from api', error)
        }
    }

    
    const { isLoading, isError, refetch } = useQuery({
        queryFn : ()=>fetchSpectrumData(),
        queryKey : ["SpectrumData"],
        onSuccess: (data : ISpectrumData) => {
            spectrumDataDispatch({ type: 'UPDATE_DATA', payload: data })
        },
      })
    
    const handleClick = () => {
        refetch()
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    
    if (isError) {
        return <div>Error fetching data</div>
    }

    return (
        <Paper elevation={3} className={styles.paper}>
          <Grid container spacing={2} className={styles.marginBottom}>
            <Grid item xs={9}>
              <Typography variant="h4" component="div" gutterBottom>
                  <b>Spectrum Data Visualization</b>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button color="primary" size="medium" variant="contained" onClick={handleClick}>Fetch New Spectrum Data</Button>
            </Grid>
          </Grid>            
          <SpectrumLineChart/>
    </Paper>
    )
}