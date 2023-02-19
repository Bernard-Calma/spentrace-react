import BackButton from "./Buttons/BackButton"
import "./NavBar.css"

const NavBar = (props) => {
    return(
        <section className="navBarContainer">
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
        </section>
    )
}

export default NavBar