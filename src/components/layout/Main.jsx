import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Header/Header';

const Main = () => {
    return (
        <div className='w-100 '>
            <Header></Header>
           <Outlet></Outlet> 
        </div>
    );
};

export default Main;