import { Assets } from "../Assets/Assets";

export function MoreButton() {
  return (
    <div className="w-[14%] bg-gray-100 border py-2 px-4 rounded-lg cursor-pointer">
      <div className="flex justify-between">
        <div className="flex">
          <img src={Assets.Calendar} alt="Calendar" />
          <p className="text-xs ml-1 text-gray-400">Return</p>
        </div>
        <img src={Assets.DropDownGray} alt="Drop down" />
      </div>
      <p className="font-bold text-base mb-1">More</p>
      <div>...</div>
    </div>
  );
}
