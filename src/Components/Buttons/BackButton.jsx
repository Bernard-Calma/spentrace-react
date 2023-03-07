const BackButton = (props) => {
    return(
        <i class="fi fi-rr-angle-small-left" onClick={() => props.handleChangeView("")}></i>
    )
}

export default BackButton