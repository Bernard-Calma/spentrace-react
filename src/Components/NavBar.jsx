import "./NavBar.css"

const NavBar = (props) => {

    const handleDelete = () => {
        let url = process.env.REACT_APP_SERVER_URL+"/plans/"+props.openBill._id
        fetch(url, {
            method: "DELETE",
        })
        .then(res => res.json())
        // Remove bill from bills list
        props.setBills(props.bills.filter((bill) => bill._id !== props.openBill._id)); 
        props.handleChangeView("Main")
    }
    return(
        <section className="navBarContainer">
            {
                props.view === "Main" 
                ? <i className="fi fi-rr-add"
                    onClick={()=> props.handleChangeView("Add")}
                ></i>
                : props.view === "Show" ? <>
                    <i className="fi fi-rr-edit" onClick={()=> props.handleChangeView("Edit")}></i>
                    <i className="fi fi-rr-trash" onClick={handleDelete}></i>
                </>
                : <>
                </>
            }
        </section>
    )
}

export default NavBar