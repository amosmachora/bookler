import { Link } from 'react-router-dom';

export function RedSearchButton({ text, to }: { text: string; to: string }) {
  return (
    <Link
      className="bg-red-600 text-white text-xs rounded-full px-5 py-3 uppercase cursor-pointer"
      to={to}
    >
      {text}
    </Link>
  );
}
