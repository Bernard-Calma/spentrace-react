const BackButton = (props) => {
    return <i 
        className="fi fi-rr-angle-small-left"
        onClick={props.handleChangeView}
    />
};

export default BackButton;