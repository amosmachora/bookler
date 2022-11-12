import React, { useContext, useState } from "react";
import { Assets } from "../../Assets/Assets";
import { Departures } from "../../Types/Flights";
import { getTotalPrice } from "../../Util/Helpers";
import { BookingContext } from "./FlightResults";
import ProgressBar from "./ProgressBar";

type PaymentOptionsProps = {
  setShowPayments: React.Dispatch<React.SetStateAction<boolean>>;
  setFoundFlights: React.Dispatch<
    React.SetStateAction<Departures[] | undefined>
  >;
  allUnfilteredFoundFlights: Departures[];
  setBooking: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentOptions = ({
  setShowPayments,
  setFoundFlights,
  allUnfilteredFoundFlights,
  setBooking,
}: PaymentOptionsProps) => {
  const remainingTime = "0min 5sec";
  const [paymentOption, setPaymentOption] = useState("CreditCard");
  const { travelersInfo, flightPrice } = useContext(BookingContext);
  return (
    <div className="flex mt-5 justify-between">
      <div className="w-3/4">
        <div className="flex justify-between py-3 px-5 rounded-md bg-flightResultsBg items-center">
          <p className="font-bold text-lg">Payment Options</p>
          <p className="text-gray-500 text-sm">
            The session will expire in{" "}
            <span className="text-sky-700 font-semibold">{remainingTime}</span>
          </p>
        </div>
        <ProgressBar
          allUnfilteredFoundFlights={allUnfilteredFoundFlights}
          setFoundFlights={setFoundFlights}
          setShowPayments={setShowPayments}
          setBooking={setBooking}
        />
        <div className="rounded-md px-12 py-6 bg-white mt-1 relative text-sm overflow-y-scroll h-80">
          <p className="font-bold text-2xl mb-5">Payment Method</p>
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
              {" "}
              I accept the Fare Rules and{" "}
              <span className="cursor-pointer text-blue-600">
                Privacy Policy
              </span>
            </p>
          </div>
          <p className="font-bold text-3xl mt-6 mb-4">
            {getTotalPrice(travelersInfo, flightPrice)}
            <span className="text-gray-300 text-xs font-medium ml-1">USD</span>
          </p>
          <button className="bg-blue-500 py-2 px-4 text-white rounded-full hover:bg-blue-800 transition-all">
            Pay Now
          </button>
        </div>
      </div>
      <div className="bg-white rounded-md h-max overflow-hidden flex flex-col items-center w-1/5 mr-6">
        <p className="bg-flightResultsBg font-semibold px-5 py-3 w-full">
          Profile
        </p>
        <img
          src={Assets.ProfilePicture}
          alt="Profile"
          className="rounded-full h-24 w-24 my-5"
        />
        <p className="text-base font-bold">Mansurul Haque</p>
        <p className="text-xs">Personal account</p>
        <button className="bg-gray-200 text-xs rounded-full py-2 px-3 font-semibold mt-4 mb-6">
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;

type PaymentProviderSelectorProps = {
  paymentOption: string;
  setPaymentOption: React.Dispatch<React.SetStateAction<string>>;
};

const PaymentProviderSelector = ({
  paymentOption,
  setPaymentOption,
}: PaymentProviderSelectorProps) => {
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
          paymentOption === "CreditCard"
            ? "border-blue-600 shadow-lg transition-all"
            : "border-transparent"
        }`}
        onClick={() => setPaymentOption("CreditCard")}
      >
        <img className="mr-2" src={Assets.CreditCard} alt="CreditCard" />
        <p>Credit/Debit Card</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === "Gift Card"
            ? "border-blue-600 shadow-lg transition-all"
            : "border-transparent"
        }`}
        onClick={() => setPaymentOption("Gift Card")}
      >
        <img className="mr-2" src={Assets.GiftCard} alt="CreditCard" />
        <p>Gift Card</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === "EMI on Credit/Debit Card"
            ? "border-blue-600 shadow-lg transition-all"
            : "border-transparent"
        }`}
        onClick={() => setPaymentOption("EMI on Credit/Debit Card")}
      >
        <img className="mr-2" src={Assets.EMICard} alt="EMICard" />
        <p>EMI on Credit/Debit Card</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === "Google Pay"
            ? "border-blue-600 shadow-lg transition-all"
            : "border-transparent"
        }`}
        onClick={() => setPaymentOption("Google Pay")}
      >
        <img className="mr-2" src={Assets.GooglePlay} alt="Google play" />
        <p>Google Pay</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === "Paypal"
            ? "border-blue-600 shadow-lg transition-all"
            : "border-transparent"
        }`}
        onClick={() => setPaymentOption("Paypal")}
      >
        <img className="mr-2" src={Assets.PayPal} alt="Paypal" />
        <p>Paypal</p>
      </div>
      <div
        className={`bg-white flex items-center py-2 px-2 rounded-sm cursor-pointer border ${
          paymentOption === "Wallet"
            ? "border-blue-600 shadow-lg transition-all"
            : "border-transparent"
        }`}
        onClick={() => setPaymentOption("Wallet")}
      >
        <img className="mr-2" src={Assets.WalletPay} alt="WalletPay" />
        <p className="mt-1">Wallet</p>
      </div>
    </div>
  );
};
