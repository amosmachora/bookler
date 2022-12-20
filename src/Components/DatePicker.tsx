import { Assets } from "../Assets/Assets";
import { getDay } from "../Util/Helpers";

export function DatePicker({
  setDate,
  date,
  name,
}: {
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  date: Date | null;
  name: string;
}) {
  return (
    <div className="rounded-md bg-gray-100 w-[32%] px-4 py-2">
      <div className="flex">
        <img src={Assets.Calendar} alt="Location" />
        <p className="text-gray-300 ml-1 text-sm">{name}</p>
      </div>
      <input
        className="font-bold mb-1 bg-gray-100"
        type="date"
        onChange={(e) => setDate(e.target.valueAsDate)}
      />
      <p className="text-xs text-gray-400">{getDay(date)}</p>
    </div>
  );
}
