const LabelInput = props => <>
    {props.text 
        ? <label
            className={props.className}
            htmlFor={props.htmlFor}
        > {props.text}
            <input 
                id = {props.id}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                required = {props.required ? true : false}
                step = {props.step}
                checked = {props.checked}
            />
            </label>
        : <input 
            id = {props.id}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            required = {props.required ? true : false}
        />
    }
</>
    
    

export default LabelInput;