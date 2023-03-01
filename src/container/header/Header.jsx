import "./header.css"

const Header = (props) => {
    return(
        <div className='header' onClick={props.handleShowNav}>
            <h1 className="title">Spentrace</h1> 
        </div>
    )
}

export default Header;