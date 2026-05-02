export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-red-400 bg-red-900/20 px-6 py-3 rounded-full">{message}</p>
    </div>
  );
}