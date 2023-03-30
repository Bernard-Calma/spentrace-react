import "./NavBar.css"
import axios from "axios"

const NavBar = (props) => {
    const handleDelete = () => {
        let url = props.view === "Show" ? process.env.REACT_APP_SERVER_URL+"/plans/"+props.openPlan._id : process.env.REACT_APP_SERVER_URL+"/bills/"+props.openBill?._id
        console.log(url)
        axios.delete(url)
        .then(res => console.log(res))
        // Remove plan from plans list
        if( props.view === "Show") {
            props.setPlans(props.plans.filter((plan) => plan._id !== props.openPlan._id)); 
            props.handleChangeView("Main")
        } else if ( props.view === "Show Bill") {
            props.handleChangeView("Bills List")
        }
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
                : props.view === "Bills List" ? 
                <>
                    <i 
                        className="fi fi-rr-add"
                        onClick={()=> props.handleChangeView("Add Bill")}
                    ></i>
                </>
                : props.view === "Show Bill" ? <>
                    <i className="fi fi-rr-edit" onClick={()=> props.handleChangeView("Edit")}></i>
                    <i className="fi fi-rr-trash" onClick={handleDelete}></i>
                </>
                : 
                <>
                </>
            }
        </section>
    )
}

export default NavBar