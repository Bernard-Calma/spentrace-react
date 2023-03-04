import "./NavBar.css"

const NavBar = (props) => {

    const handleDelete = () => {
        let url = process.env.REACT_APP_SERVER_URL+"/plans/"+props.openBill._id
        console.log("Fetch : " + url)
        fetch(url, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => console.log(data))
        props.handleChangeView("Main")
    }
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
                    <p className="navBarItem" onClick={()=> props.handleChangeView("Edit")}>Edit</p>
                    <img className="navIcon" src="https://cdn-icons.flaticon.com/svg/3917/3917411.svg?token=exp=1677893570~hmac=640fb2f0918f5c6ffad6ca5afdc88dc4" alt="delete" onClick={handleDelete}/>
                </>
                : <>
                </>
            }
        </section>
    )
}

export default NavBar