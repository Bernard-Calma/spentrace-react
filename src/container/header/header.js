import NavBar from '../../Components/NavBar';
import "./header.css"

const Header = () => {
    return(
        <div className='header'>
            <h1 className="title">Spentrace</h1>
            <NavBar />
        </div>
    )
}

export default Header;