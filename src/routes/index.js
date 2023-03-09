import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from '../pages/Home'
import Register from '../pages/Register'
import Admin from "../pages/Admin";

import Private from './Private'

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            
            <Route path="/admin" element={<Private> <Admin/> </Private>}/>
        </Routes>
    )
}

export default RoutesApp