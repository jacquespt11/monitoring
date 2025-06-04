type ToolProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export default function NetworkToolCard({ title, description, icon, onClick }: ToolProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gray-800 hover:bg-gray-700 transition p-5 rounded-lg text-white shadow-md flex items-center gap-4"
    >
      <div className="bg-blue-700 p-2 rounded-full">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
}
