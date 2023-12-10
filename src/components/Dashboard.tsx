import {Box,Typography} from '@mui/material'
import styles from './Dashboard.module.css'
import {Link} from 'react-router-dom'

export const Dashboard = ()=>{
    return (
        <Box className={styles.text}>
             <Typography variant="h4" gutterBottom>
                Web Frontend Software Engineer: Assignment
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Please click on below to view the web-based GUI for that particular assignment !
            </Typography>
            <Link to='/assignmentA' className={styles.linkColor} ><Typography variant="subtitle2" gutterBottom>
                Assignment A
            </Typography></Link>
            <Link to='/assignmentB' className={styles.linkColor} ><Typography variant="subtitle2" gutterBottom>
                Assignment B
            </Typography></Link>
        </Box>
    )
}