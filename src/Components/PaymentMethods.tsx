import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Assets } from '../Assets/Assets';

const PaymentMethods = ({
  className,
  setShowPaymentMethodsModal,
}: {
  className: string;
  setShowPaymentMethodsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [paymentOption, setPaymentOption] = useState('CreditCard');

  return (
    <div
      className={`rounded-md px-12 py-6 bg-white mt-1 relative text-sm overflow-y-scroll ${className}`}
    >
      <div className="flex justify-between mb-5 items-center">
        <p className="font-bold text-xl">Pick a payment method</p>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="text-red-600 cursor-pointer"
          onClick={() => setShowPaymentMethodsModal(false)}
        />
      </div>
      <PaymentProviderSelector
        paymentOption={paymentOption}
        setPaymentOption={setPaymentOption}
      />
      <p className="mt-24 mb-3">Card Number</p>
      <input
        type="number"
        className="border w-full h-11 rounded-md bg-flightResultsBg px-4"
      />
      <p className="mt-6 mb-3">Name Of Card</p>
      <input
        type="text"
        className="border w-full h-11 rounded-md bg-flightResultsBg px-4"
      />
      <div className="flex mt-8 w-3/4 justify-between">
        <div className="w-1/4">
          <p className="mb-3">Expiry Month</p>
          <select className="border h-11 rounded-md bg-flightResultsBg px-4 w-full">
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <div className="w-1/4">
          <p className="mb-3">Expiry year</p>
          <select className="border h-11 rounded-md bg-flightResultsBg px-4 w-full">
            <option value="2000">2000</option>
            <option value="2001">2001</option>
          </select>
        </div>
        <div className="w-1/4">
          <p className="mb-3">CVC Code</p>
          <input
            type="number"
            className="border h-11 rounded-md bg-flightResultsBg px-4 w-full"
          />
        </div>
      </div>
      <div className="flex mt-7">
        <input
          type="checkbox"
          name="Privacy Policy"
          className="mr-1 h-5 w-5 cursor-pointer"
        />
        <p>
          {' '}
          I accept the Fare Rules and{' '}
          <span className="cursor-pointer text-blue-600">Privacy Policy</span>
        </p>
      </div>
      <button className="bg-blue-500 mt-5 py-3 w-full px-4 text-white rounded-full hover:bg-blue-800 transition-all">
        Add Payment Method
      </button>
    </div>
  );
};

export default PaymentMethods;

const PaymentProviderSelector = ({
  paymentOption,
  setPaymentOption,
}: {
  paymentOption: string;
  setPaymentOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="absolute right-0 left-0 bg-paymentOptions flex px-16 py-3 justify-between text-xs font-semibold">
      <img
        src={Assets.ArrowLeft}
        alt="Arrow"
        className="absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-not-allowed"
      />
      <img
        src={Assets.ArrowRight}
        alt="Arrow"
        className="absolute right-5 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-not-allowed"
      />
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === 'CreditCard'
            ? 'border-blue-600 shadow-lg transition-all'
            : 'border-transparent'
        }`}
        onClick={() => setPaymentOption('CreditCard')}
      >
        <img className="mr-2" src={Assets.CreditCard} alt="CreditCard" />
        <p>Credit/Debit Card</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === 'Gift Card'
            ? 'border-blue-600 shadow-lg transition-all'
            : 'border-transparent'
        }`}
        onClick={() => setPaymentOption('Gift Card')}
      >
        <img className="mr-2" src={Assets.GiftCard} alt="CreditCard" />
        <p>Gift Card</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === 'EMI on Credit/Debit Card'
            ? 'border-blue-600 shadow-lg transition-all'
            : 'border-transparent'
        }`}
        onClick={() => setPaymentOption('EMI on Credit/Debit Card')}
      >
        <img className="mr-2" src={Assets.EMICard} alt="EMICard" />
        <p>EMI on Credit/Debit Card</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === 'Google Pay'
            ? 'border-blue-600 shadow-lg transition-all'
            : 'border-transparent'
        }`}
        onClick={() => setPaymentOption('Google Pay')}
      >
        <img className="mr-2" src={Assets.GooglePlay} alt="Google play" />
        <p>Google Pay</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === 'Paypal'
            ? 'border-blue-600 shadow-lg transition-all'
            : 'border-transparent'
        }`}
        onClick={() => setPaymentOption('Paypal')}
      >
        <img className="mr-2" src={Assets.PayPal} alt="Paypal" />
        <p>Paypal</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === 'Wallet'
            ? 'border-blue-600 shadow-lg transition-all'
            : 'border-transparent'
        }`}
        onClick={() => setPaymentOption('Wallet')}
      >
        <img className="mr-2" src={Assets.WalletPay} alt="WalletPay" />
        <p className="mt-1">Wallet</p>
      </div>
    </div>
  );
};
