const SelectInput = ({ options, value, onChange, name, text, className }) => {
  return (
    <div className={`input-select ${className}`}>
      <label htmlFor={name}>{text} </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`select-input ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
// Usage example:
// <SelectInput
//   options={["Option 1", "Option 2", "Option 3"]}
//   value={selectedOption}
//   onChange={(e) => setSelectedOption(e.target.value)}
//   name="exampleSelect"
//   className="custom-select"
// />
// This component can be used to create a dropdown select input with dynamic options.
