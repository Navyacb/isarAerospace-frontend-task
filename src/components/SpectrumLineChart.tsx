import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { Grid, Alert , Typography} from '@mui/material';
import { useContext } from 'react';
import { SpectrumDataContext } from '../state-management/SpectrumDataContext';
import { DataDisplay } from './DataDisplay';

export const SpectrumLineChart = ()=>{

  const {spectrumData} = useContext(SpectrumDataContext)

  const chartData = [
    { name: 'temperature', value: spectrumData.temperature },
    { name: 'velocity', value: spectrumData.velocity },
    { name: 'altitude', value: spectrumData.altitude },
  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <LineChart width={600} height={300} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </Grid>
      <Grid item xs={6} spacing={2} container>
        <Grid item xs={6}>
          <DataDisplay label='Velocity' data={spectrumData.velocity } />
          <DataDisplay label='Altitude' data={spectrumData.altitude} />
          <DataDisplay label='Temperature' data={spectrumData.temperature}/>
        </Grid>
        <Grid item xs={6}>
          <DataDisplay label='Status Message' data={spectrumData.statusMessage} />
          <DataDisplay label='Rocket is ' data={spectrumData.isAscending ? 'Ascending' : 'Descending'} />
          <div>
            <Typography variant="h6" gutterBottom>
               <b> Crew member action </b>
            </Typography>
            {spectrumData.isActionRequired ? (
              <Alert severity="error">Action Required!</Alert>
            ) : (
              <Alert severity="success">No action required</Alert>
            )}
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}