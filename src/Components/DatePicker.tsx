import { Assets } from '../Assets/Assets';
import { useCarRentalDataContext } from '../Hooks/useCarRentalData';
import { useFlightDataContext } from '../Hooks/useFlightData';
import { useHotelDataContext } from '../Hooks/useHotelData';
import { getDay } from '../Util/Helpers';

export function DatePicker({
  date,
  name,
  type,
  source,
  className,
}: {
  date: Date | null;
  name: string;
  type:
    | 'drop-off-date'
    | 'pick-up-date'
    | 'departure-date'
    | 'return-date'
    | 'check-in-date'
    | 'check-out-date';
  source: 'CarRental' | 'Flights' | 'Hotels';
  className?: string;
}) {
  const { setUserCarRentalChoices } = useCarRentalDataContext();
  const { setUserFlightChoices } = useFlightDataContext();
  const { setUserHotelChoices } = useHotelDataContext();

  const handleSettingDate = (date: Date | null) => {
    if (source === 'CarRental') {
      setUserCarRentalChoices((prev) => {
        return {
          ...prev,
          dropOffDate: type === 'drop-off-date' ? date : prev!.dropOffDate,
          pickUpDate: type === 'pick-up-date' ? date : prev!.pickUpDate,
        };
      });
    } else if (source === 'Hotels') {
      setUserHotelChoices((prev) => {
        return {
          ...prev,
          checkInDate: type === 'check-in-date' ? date : prev.checkInDate,
          checkOutDate: type === 'check-out-date' ? date : prev.checkOutDate,
        };
      });
    } else if (source === 'Flights') {
      setUserFlightChoices((prev) => {
        return {
          ...prev,
          returnDate: type === 'return-date' ? date : prev!.returnDate,
          departureDate: type === 'departure-date' ? date : prev!.departureDate,
        };
      });
    }
  };

  return (
    <div className={`rounded-md bg-gray-100 w-[32%] px-4 py-2 ${className}`}>
      <div className="flex">
        <img src={Assets.Calendar} alt="Location" />
        <p className="text-gray-300 ml-1 text-sm">{name}</p>
      </div>
      <input
        className="font-bold mb-1 bg-gray-100"
        type="date"
        onChange={(e) => handleSettingDate(e.target.valueAsDate)}
      />
      <p className="text-xs text-gray-400">{getDay(date)}</p>
    </div>
  );
}
