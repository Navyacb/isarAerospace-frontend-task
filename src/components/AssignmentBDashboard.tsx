import { useEffect , useContext, useRef, useState} from 'react';
import { SpectrumDataContext } from '../state-management/SpectrumDataContext';
import { Button, Grid, Paper , Typography , Modal, Backdrop, Fade} from '@mui/material';
import styles from './AssignmentBDashboard.module.css'
import { SpectrumLineChart } from './SpectrumLineChart';

export const AssignmentBDashboard = ()=>{
    const {spectrumDataDispatch,spectrumData} = useContext(SpectrumDataContext)
    const [openModal, setOpenModal] = useState(false)
    const socketRef = useRef<WebSocket | null>(null)

    const fetchDataFromWebSocket = () => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            const socket = new WebSocket('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS')

            socket.onmessage = (event) => {
            const liveData = JSON.parse(event.data)
            const obj = {
                velocity: liveData.Velocity,
                altitude: liveData.Altitude,
                temperature: liveData.Temperature,
                statusMessage: liveData.StatusMessage,
                isAscending: liveData.IsAscending,
                isActionRequired: liveData.IsActionRequired,
            }
            console.log(obj)
            spectrumDataDispatch({ type: 'UPDATE_DATA', payload: obj })
            }
            socket.onclose = (event) => {
                console.error('WebSocket closed:', event)
            }
            socketRef.current = socket
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchDataFromWebSocket()
        }
      
        fetchData()
      
          const intervalId = setInterval(() => {
            fetchData()
          }, 1000000)
      
          // Clear the interval when the component is unmounted
          return () => {
            clearInterval(intervalId)
            if (socketRef.current) {
                socketRef.current.close()
              }
          }
      }, [])

      const handleAction = ()=>{
        //we can create a model here 
        alert('Critical Action Required! The launch vehicle requires immediate action. Please act using the provided endpoint.')
        // we have to perform some action to end point api , was not clear what should be passed to API request
        //https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum

      }

    return (
        <Paper elevation={3} className={styles.paper}>
            <Grid container spacing={2}>
            <Grid item xs={9}>
             <Typography variant="h4" component="div" gutterBottom>
                  <b>Spectrum Data Visualization</b>
            </Typography>
            </Grid>
            <Grid item xs={3}>
            {spectrumData.isActionRequired && (
                <Button color="primary" size="small" variant="contained"  onClick={handleAction}>Perform Action</Button>
            )}
            </Grid>
            </Grid>
            <SpectrumLineChart/>
        </Paper>
    )
}