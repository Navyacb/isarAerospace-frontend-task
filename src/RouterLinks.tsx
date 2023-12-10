import {Routes,Route} from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { AssignmentADashboard } from './components/AssignmentADashboard'
import { AssignmentBDashboard } from './components/AssignmentBDashboard'

export const RouterLinks = ()=>{
    return (
        <Routes>
            <Route element={<Header/>}>
                <Route path="/" element={<Dashboard/>}/>
                <Route path='/assignmentA' element={<AssignmentADashboard/>}  />
                <Route path='/assignmentB' element={<AssignmentBDashboard/>} />
            </Route>
        </Routes>
    )

}