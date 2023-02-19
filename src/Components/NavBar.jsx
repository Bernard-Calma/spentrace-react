import "./NavBar.css"

const NavBar = (props) => {
    return(
        <section className="navBarContainer">
            <p className="navBarItem" onClick={()=> props.handleChangeView("Add")}>Add</p>
            <p className="navBarItem">Edit</p>
            <p className="navBarItem">Delete</p>
        </section>
    )
}

export default NavBar