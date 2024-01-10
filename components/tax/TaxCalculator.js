
import React, { useState } from 'react';

// Define social security rate
const socialSecurityRate = 0.3142;

// Define price base amount for 2023

const brackets2023 = [
  {
    incomeRange: { min: 0, max: 9125 }, // <= 0.91 pbb
    deduction: { base: 0, percentage: 0 },
  },
  {
    incomeRange: { min: 9126, max: 27000 }, // 0.91 pbb – 3.24 pbb
    deduction: { base: 9125, percentage: 38.74 },
  },
  {
    incomeRange: { min: 27001, max: 64800 }, // 3.24 pbb – 8.08 pbb
    deduction: { base: 27000, percentage: 12.8 },
  },
  {
    incomeRange: { min: 64801, max: Infinity }, // > 13.54 pbb
    deduction: { base: 64800, percentage: 0 },
  },
];


// Function to calculate the monthly tax reduction percentage
function calculateMonthlyTaxReductionPercentage(monthlyIncome) {
  for (const bracket of brackets2023) {
    const { incomeRange, deduction, reductionPercentage } = bracket;
    if (monthlyIncome >= incomeRange.min && monthlyIncome <= incomeRange.max) {
      // Calculate the monthly tax reduction percentage
      let reduction = (monthlyIncome - deduction.base ) * (deduction.percentage / 100);
      return reduction 
    }
  }
}
// Function to calculate net salary and total cost to employer
function calculateSalaryAndCost(grossSalary, municipalTaxRate, age) {
  // Calculate employer's social security contributions
  const socialSecurityContributions = grossSalary * socialSecurityRate;

  // Calculate income tax
  const incomeTaxBeforeDeduction = grossSalary * (municipalTaxRate / 100);

  // Calculate job tax deduction
  
  if (grossSalary > 50000) {
    const additionalTaxAmount = (grossSalary - 50000) * 0.18;
    incomeTaxBeforeDeduction += additionalTaxAmount;
  }
  const jobTaxDeduction = calculateMonthlyTaxReductionPercentage(grossSalary);
  
  // Ensure that income tax is not less than zero after deduction
  const incomeTax = Math.max(0, incomeTaxBeforeDeduction - jobTaxDeduction);
  
  
  // Calculate net salary
  const netSalary = grossSalary - incomeTax;
  // Calculate total cost to employer
  const totalCostToEmployer = grossSalary + socialSecurityContributions;

  // Return results
  return {
    grossSalary,
    netSalary,
    totalCostToEmployer,
    deductions: {
      socialSecurityContributions,
      incomeTax,
    },
  };
}

export default function TaxCalculator() {
  const [grossSalary, setGrossSalary] = useState('');
  const [municipalTaxRate, setMunicipalTaxRate] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!grossSalary || !municipalTaxRate || !age) {
      setError('Please fill in all fields.');
      return;
    }

    const result = calculateSalaryAndCost(
      Number(grossSalary),
      Number(municipalTaxRate),
      Number(age)
    );
    setSalary(result);
    setError('');
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <FormField
          label="Lön Innan skatt"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
          type="number"
          required
        />
        <FormField
          label="Skattesats för din kommun"
          value={municipalTaxRate}
          onChange={(e) => setMunicipalTaxRate(e.target.value)}
          type="number"
          required
        />
        <FormField
          label="Ålder"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Calculate
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      {salary && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Results</h2>
          <p>Net Salary: {formatCurrency(salary.netSalary)}</p>
          <p>Employer's Social Security Contributions: {formatCurrency(salary.deductions.socialSecurityContributions)}</p>
          <p>Income Tax: {formatCurrency(salary.deductions.incomeTax)}</p>
          <p>Total Cost to Employer: {formatCurrency(salary.totalCostToEmployer)}</p>
        </div>
      )}
    </div>
  );
}

function FormField({ label, value, onChange, type, required }) {
  return (
    <label className="flex flex-col">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="p-2 border border-gray-300 rounded"
      />
    </label>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(value);
}
