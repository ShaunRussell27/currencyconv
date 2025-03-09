//imported the nesaccary hooks and components
import React, { useState, useMemo } from "react";

// Set xchange rates for all the different  chosen currencies
const exchangeRates = {
  USD: { EUR: 0.85, GBP: 0.75, JPY: 110.0, AUD: 1.35 },
  EUR: { USD: 1.18, GBP: 0.88, JPY: 129.53, AUD: 1.59 },
  GBP: { USD: 1.33, EUR: 1.14, JPY: 147.02, AUD: 1.81 },
  JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0068, AUD: 0.012 },
  AUD: { USD: 0.74, EUR: 0.63, GBP: 0.55, JPY: 82.74 },
};

// Currency component
// inputting the amount and selecting currency
const CurrencyInput = ({ label, disabled, amount, AmountChange, currency, CurrencyExchange }) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <label className="font-semibold">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => AmountChange(parseFloat(e.target.value) || 0)}
          className="border p-2 rounded"
          min="0"
          disabled={disabled}
        />
        <select value={currency} onChange={(e) => CurrencyExchange(e.target.value)} className="border p-2 rounded">
          {Object.keys(exchangeRates).map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Converter Component
//   converting the currencies
export default function Converter() {
  const [amount, setAmount] = useState(1); // State for the amount to be converted
  const [fromCurrency, setFromCurrency] = useState("USD"); // State for the source currency
  const [toCurrency, setToCurrency] = useState("EUR"); // State for the target currency

  // Calculate the converted amount using useMemo hook 
  const convertedAmount = useMemo(() => {
    if (fromCurrency === toCurrency) return amount;
    return (amount * (exchangeRates[fromCurrency][toCurrency] || 1)).toFixed(2);
  }, [amount, fromCurrency, toCurrency]);

  //set correct values to variables
    return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Exchange money of your choice:</h2>
      <CurrencyInput
        label="Amount to Convert: "
        amount={amount}
        AmountChange={setAmount}
        currency={fromCurrency}
        CurrencyExchange={setFromCurrency}
        disabled={false}
      />
      <div className="text-center my-4">➡️</div>
      <CurrencyInput
        label="Converted Amount: "
        amount={convertedAmount}
        AmountChange={setAmount}
        currency={toCurrency}
        CurrencyExchange={setToCurrency}
        disabled={true}
      />
    </div>
  );
}