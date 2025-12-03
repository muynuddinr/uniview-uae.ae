// app/hospital-solutions/page.tsx
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HospitalSolution from './Hospitalsolution';

const page = () => {
    return (
        <>
            <Navbar />
            <HospitalSolution />
            <Footer />
        </>
    );
};

export default page;