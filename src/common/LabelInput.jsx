const LabelInput = props => <>
    {props.text 
        ? <label
            className={props.className}
            htmlFor={props.htmlFor}
        > {props.text}
            <input 
                type={props.text}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                required = {props.required ? true : false}
            />
            </label>
        : <input 
            type={props.text}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            required = {props.required ? true : false}
        />
    }
</>
    
    

export default LabelInput;