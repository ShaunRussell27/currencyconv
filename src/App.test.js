
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import { useState, useMemo } from "react";

const exchangeRates = {
  USD: { EUR: 0.85, GBP: 0.75 },
  EUR: { USD: 1.18, GBP: 0.88 },
  GBP: { USD: 1.33, EUR: 1.14 },
};

const CurrencyInput = ({ amount, onAmountChange, currency, onCurrencyChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
        className="border p-2 rounded"
        min="0"
      />
      <select value={currency} onChange={(e) => onCurrencyChange(e.target.value)} className="border p-2 rounded">
        {Object.keys(exchangeRates).map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>
    </div>
  );
};

export default function Converter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const convertedAmount = useMemo(() => {
    if (fromCurrency === toCurrency) return amount;
    return (amount * (exchangeRates[fromCurrency][toCurrency] || 1)).toFixed(2);
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Currency Converter</h2>
      <CurrencyInput amount={amount} onAmountChange={setAmount} currency={fromCurrency} onCurrencyChange={setFromCurrency} />
      <div className="text-center my-4">➡️</div>
      <CurrencyInput amount={convertedAmount} currency={toCurrency} onCurrencyChange={setToCurrency} />
    </div>
  );
}

