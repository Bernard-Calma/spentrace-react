const Feature = ({ feature }) => {
  return (
    <div
      className={`feature ${
        feature.unlocked
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-gray-50 border-gray-200 text-gray-500"
      }`}
    >
      <span>{feature.title}</span>
      <span className="text-sm font-medium">Unlock 🔓</span>
    </div>
  );
};
export default Feature;
