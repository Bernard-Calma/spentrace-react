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
                ? <i className="fi fi-rr-add"
                    onClick={()=> props.handleChangeView("Add")}
                ></i>
                : props.view === "Show" ? <>
                    <i class="fi fi-rr-edit" onClick={()=> props.handleChangeView("Edit")}></i>
                    <i class="fi fi-rr-trash" onClick={handleDelete}></i>
                </>
                : <>
                </>
            }
        </section>
    )
}

export default NavBar