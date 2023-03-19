import "./NavBar.css"

const NavBar = (props) => {

    const handleDelete = () => {
        let url = process.env.REACT_APP_SERVER_URL+"/plans/"+props.openPlan._id
        fetch(url, {
            method: "DELETE",
        })
        .then(res => res.json())
        // Remove plan from plans list
        props.setPlans(props.plans.filter((plan) => plan._id !== props.openPlan._id)); 
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