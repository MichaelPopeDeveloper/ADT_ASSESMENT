"use client"

import Image from "next/image";
import React from 'react';

export default function Home() {

  const [totalCost, setTotalCost] = React.useState<string>('0');
  const [totalAmount, setTotalAmount] = React.useState<string>('0');

  const [currencyCount, setCurrencyCount] = React.useState<any>({
    tenDollar: 0,
    fiveDollar: 0,
    quarter: 0,
    nickel: 0,
    penny: 0
  })

  const currencyValues: any = {
    tenDollar: 10,
    fiveDollar: 5,
    quarter: 0.25,
    nickel: 0.05,
    penny: 0.01
  }

  const generateChange = () => {
    // Calculate the initial change to be given back
    let currentChange = parseFloat(totalCost) - parseFloat(totalAmount);
    let changes: any = {};
  
    // Early exit if no change is needed (i.e., exact amount or insufficient amount given)
    if (currentChange <= 0) {
      setCurrencyCount({
        tenDollar: 0,
        fiveDollar: 0,
        quarter: 0,
        nickel: 0,
        penny: 0
      });
      return;
    }
  
    // Calculate the number of each currency unit needed to make the change
    Object.entries(currencyValues).forEach(([key, value]: any) => {
      const numberOfCurrency = Math.floor(currentChange / value);
      const remainingChange = currentChange - (numberOfCurrency * value);
  
      if (numberOfCurrency > 0) {
        currentChange = remainingChange;
        changes[key] = numberOfCurrency;
      } else {
        changes[key] = 0;
      }
    });
  
    // Update the currency count state
    setCurrencyCount((prevValues: any) => ({ ...prevValues, ...changes }));
    console.log(`Final remaining amount = ${currentChange.toFixed(2)}`);
  };
  


  React.useEffect(() => {
    if (totalCost && totalAmount) {
      generateChange();
    }

  }, [totalAmount, totalCost]);

  React.useEffect(() => console.log(currencyCount), [currencyCount])

  const handleTotalCostChange = (e: React.ChangeEvent<HTMLInputElement>) => setTotalCost(e.target.value);
  const handleTotalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => setTotalAmount(e.target.value);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <form>
        <label>Total Cost: </label>
        <br />
        <input id="totalCost" className="money-input" value={totalCost} onChange={handleTotalCostChange} />
        <br />
        <br />
        <label>Total Amount: </label>
        <br />
        <input id="amountProvided" className="money-input" value={totalAmount} onChange={handleTotalAmountChange} />
      </form>

      <section>


        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  $10 Bill
                </th>
                <th scope="col" className="px-6 py-3">
                  $5 Bill
                </th>
                <th scope="col" className="px-6 py-3">
                  Quarter
                </th>
                <th scope="col" className="px-6 py-3">
                  Nickle
                </th>
                <th scope="col" className="px-6 py-3">
                  Penny
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {currencyCount.tenDollar}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {currencyCount.fiveDollar}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {currencyCount.quarter}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {currencyCount.nickel}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {currencyCount.penny}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

      </section>
    </main>
  );
}
