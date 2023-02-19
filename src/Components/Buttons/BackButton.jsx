const BackButton = (props) => {
    return(
        <div className="backButton">
            <h1 className = "return" onClick={() => props.handleChangeView("")}>◄</h1>
        </div>
    )
}

export default BackButton