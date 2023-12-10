import {AppBar, Toolbar} from '@mui/material'
import {Link,Outlet} from 'react-router-dom'
import Logo from '../images/logo.jpg'
import styles from './Header.module.css'

export const Header = ()=>{
    return (
        <>
            <AppBar position="static" className={`${styles.header} ${styles.appBar}`}>
                <Toolbar>
                    <Link to='/'><img src= {Logo} className={`${styles.logo}`} alt='Logo'/></Link>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </>
    )
}