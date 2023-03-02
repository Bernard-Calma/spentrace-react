import "./NavBar.css"

const NavBar = (props) => {
    return(
        <section className="navBarContainer">
            {
                props.view === "Main" 
                ? <img 
                    className="navBarItem navIcon"  
                    src="https://www.flaticon.com/svg/vstatic/svg/9243/9243903.svg?token=exp=1677635808~hmac=64dc26a1ea060cb9c641892211927cfc" 
                    alt="add" 
                    onClick={()=> props.handleChangeView("Add")}
                />
                : props.view === "Show" ? <>
                    <p className="navBarItem">Edit</p>
                    <p className="navBarItem">Delete</p>
                </>
                : <>
                </>
            }
        </section>
    )
}

export default NavBar