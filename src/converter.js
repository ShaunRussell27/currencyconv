import React, { useState, useMemo } from "react";

// Exchange rates for different currencies
const exchangeRates = {
  USD: { EUR: 0.85, GBP: 0.75, JPY: 110.0, AUD: 1.35 },
  EUR: { USD: 1.18, GBP: 0.88, JPY: 129.53, AUD: 1.59 },
  GBP: { USD: 1.33, EUR: 1.14, JPY: 147.02, AUD: 1.81 },
  JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0068, AUD: 0.012 },
  AUD: { USD: 0.74, EUR: 0.63, GBP: 0.55, JPY: 82.74 },
};

// Currency symbols
const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
};

// Country flags
const currencyFlags = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  AUD: "🇦🇺",
};

// Currency Input Component
const CurrencyInput = ({ label, amount, AmountChange, currency, CurrencyExchange, disabled }) => {
  return (
    <div>
      <label className="label">{label}</label>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => AmountChange(parseFloat(e.target.value) || 0)}
          min="0"
          disabled={disabled}
        />
        <select value={currency} onChange={(e) => CurrencyExchange(e.target.value)}>
          {Object.keys(exchangeRates).map((cur) => (
            <option key={cur} value={cur}>{cur}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


// Converter Component
export default function Converter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [fee, setFee] = useState(0); // Commission percentage
  const [favorites, setFavorites] = useState([]); // Store the favorite conversions

  // Convert to multiple currencies at once
  const convertedAmounts = useMemo(() => {
    return Object.keys(exchangeRates[fromCurrency]).reduce((acc, toCurrency) => {
      let convertedValue = amount * exchangeRates[fromCurrency][toCurrency];
      let feeAmount = (convertedValue * fee) / 100;
      acc[toCurrency] = (convertedValue - feeAmount).toFixed(2);
      return acc;
    }, {});
  }, [amount, fromCurrency, fee]);

  // Save favorite conversions
  const saveFavorite = () => {
    if (!favorites.find(fav => fav.currency === fromCurrency)) {
      setFavorites([...favorites, { currency: fromCurrency, amount }]);
    }
  };

  return (
    <div >
      <h2>Exchange money of your choice:</h2>
      
      <CurrencyInput // Input the amount to convert
        label="Amount to Convert:"
        amount={amount}
        AmountChange={setAmount}
        currency={fromCurrency}
        CurrencyExchange={setFromCurrency}
        disabled={false}
      />

      <div> 
        <label>Commission Fee (%):</label> 
        <div>
          <input // input the commsision fee as percentage
            type="number"
            value={fee}
            onChange={(e) => setFee(parseFloat(e.target.value) || 0)}
            min="0"
          />
        </div>
      </div>

      {/* Display the converted amounts */}
      <div>
        <h3>Converted Amounts:</h3>
        {Object.entries(convertedAmounts).map(([currency, convertedValue]) => (
          <p key={currency}>
            {currencyFlags[currency]} {currencySymbols[currency]}{convertedValue} ({currency})
          </p>
        ))}
      </div>

        {/* Button to save the current conversion as a favorite */}
      <button
        onClick={saveFavorite}className="button">
        Save Favorite Conversion
      </button>

        {/* Display saved favorite conversions */}
      {favorites.length > 0 && (
        <div>
          <h3>Saved Conversions:</h3>
          <ul >
            {favorites.map((fav, index) => (
              <li key={index} className="mt-1">
                {currencyFlags[fav.currency]} {currencySymbols[fav.currency]}{fav.amount} ({fav.currency})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}