"use-client"
import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/joy/Button';
import { genericCall } from '../api/api'; // Import the genericCall function
import Grid from '@mui/joy/Grid';
import CompanyCard from "@/components/custommui/customCard"
import { FormContext } from '@/components/context/FormContext';
import { StepContext } from '@/components/context/StepContext';
import TaxCalculator from '@/components/tax/TaxCalculator';

export default function Companies() {
  const { state } = useContext(FormContext);
  const { dispatchStep } = useContext(StepContext);
  const [companyData, setCompanyData] = useState([]);
 

  useEffect(() => {
    const endpoint = 'companies';
    const databaseNames = state.addons.map(addon => addon.database_name);

    const sortParams = { categories: databaseNames, email: state.email, company: state.company_name }
    console.log("sortParams", sortParams)
    
    genericCall(endpoint, 'GET', null, sortParams)
      .then((response) => {
        setCompanyData(response);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, []);


  const renderCompanyCards = () => {
    return companyData.map((company, index) => {
      return (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <CompanyCard company={company} />
        </Grid>
      );
    });
  };

  return (
    <div>
    <Grid container spacing={2}>
      {renderCompanyCards()}
    </Grid>
       <TaxCalculator />
    </div>
  );
}


