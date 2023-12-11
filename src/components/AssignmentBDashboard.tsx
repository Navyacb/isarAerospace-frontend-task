import { useEffect , useContext, useRef, useState} from 'react';
import { SpectrumDataContext } from '../state-management/SpectrumDataContext';
import { Button, Grid, Paper , Typography} from '@mui/material';
import styles from './AssignmentBDashboard.module.css'
import { SpectrumLineChart } from './SpectrumLineChart';

export const AssignmentBDashboard = ()=>{
    const {spectrumDataDispatch,spectrumData} = useContext(SpectrumDataContext)
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

                if(obj.isActionRequired) {
                    spectrumDataDispatch({ type: 'UPDATE_DATA', payload: obj })
                    //close the websocket for short time
                    if (socket.readyState === WebSocket.OPEN) {
                        socket.close()
                    }
                    return
                }
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

        const reconnectInterval = setInterval(() => {
            if (socketRef.current) {
              socketRef.current.close();
            }
            fetchDataFromWebSocket();
          }, 10000);
      
      
    // Clear the interval when the component is unmounted
          return () => {
            if (socketRef.current) {
                socketRef.current.close()
              }
              clearInterval(reconnectInterval);
          }
      }, [])

      const handleAction = ()=>{
    
        //we can create a model here giving option to user to act or not act
        alert('Critical Action Required! The launch vehicle requires immediate action. Please act using the provided endpoint.')
        // we have to perform some action to end point api , was not clear what should be passed to API request so i could not exactly post/PUT
        //https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum
        fetchDataFromWebSocket()

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