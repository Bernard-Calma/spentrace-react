const LabelInput = (props) => (
  <>
    {props.text ? (
      <label
        className={props.className || "label-input"}
        htmlFor={props.htmlFor}
      >
        {" "}
        {props.text}
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder || "Enter your " + props.name}
          value={props.value}
          onChange={props.onChange}
          required={props.required ? true : false}
          step={props.step}
          checked={props.checked}
          disabled={props.disabled}
        />
      </label>
    ) : (
      <input
        className={props.className}
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        required={props.required ? true : false}
      />
    )}
  </>
);

export default LabelInput;
