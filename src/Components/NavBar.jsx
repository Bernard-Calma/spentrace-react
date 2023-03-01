import Footer from "../container/footer/Footer"
import Header from "../container/header/Header"
import BackButton from "./Buttons/BackButton"
import "./NavBar.css"

const NavBar = (props) => {
    return(
        <section className="navBarContainer">
            <Header />
            <div className="navBar">
            {
                props.view === "Main" ? <p className="navBarItem" onClick={()=> props.handleChangeView("Add")}>Add</p>
                : <>
                    {
                        props.view === "Add" ? <></>
                        : <>
                            <p className="navBarItem">Edit</p>
                            <p className="navBarItem">Delete</p>
                        </>
                    }
                </>

            }
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/126/126467.png" alt="logout" className="btnLogout"/>
        <   Footer />
        </section>
    )
}

export default NavBar