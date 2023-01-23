import React ,{Component} from 'react';
import NavBar from '../../Components/NavBar';
import "./header.css"

class  Header extends Component {
    render(){
        return(
            <div className='header'>
                <h1 className="title">Spentrace</h1>
                <NavBar />
            </div>
        )
    }
}

export default Header;