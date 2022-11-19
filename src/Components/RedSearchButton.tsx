type RedSearchButtonProps = {
  text: string;
};

export function RedSearchButton({ text }: RedSearchButtonProps) {
  return (
    <p className="bg-red-600 text-white text-xs rounded-full px-5 py-3 uppercase cursor-pointer">
      {text}
    </p>
  );
}
