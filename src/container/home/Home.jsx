import axios from 'axios'
import { useEffect, useState } from 'react'
import AddBill from '../add/AddBill'
import AddPlan from '../add/AddPlan'
import BillsList from '../billsList/BillsList'
import EdditBill from '../edit/EditBill'
import PlanList from '../plan/PlansList'
import ShowBill from '../show/ShowBill'
import DashBoard from './Dashboard'
import EmptyDashboard from './EmptyDashboard'
import './home.css'

const Home = (props) => {
    // VARIABLES

    // Views
    let [homeView, setHomeView] = useState('Home')

    // Plans
    const [plans, setPlans] = useState([])

    // Bills
    const [bills, setBills] = useState([])
    const [openBill, setOpenBill] = useState()
    const [nextUnpaidBill , setNextUnpaidBill] = useState({})
    // ------------------------------ END OF VARIABLES ------------------------------

    // FUNCTIONS

    // Views
    const handleChangeView = (view) => {
        setHomeView(view)
    }

    // Plan
    const getPlans = () => {
        // Get all plans from user
        axios({ 
            method: "GET",
            url: `${props.server}/plans/`,
            withCredentials: true 
        })
        .then(res => setPlans(res.data))
        .catch(err => console.log(err))
    }

    const addNewPlan = (newPlan) => {
        setPlans([...plans, newPlan])
    }
        
    // Bills
    const getBills = () => {
        axios({
            method: "GET",
            url: `${props.server}/bills/${props.user._id}`,
            withCredentials: true
        })
        .then(res => setBills(res.data))
        .catch(err => console.log(err))
    } 

    const addNewBill = (newBill) => {
        setPlans([...bills, newBill])
    }
    
    const updateBills = (newBill) => {
        let newBillsList = bills.map((bill)=> bill._id === newBill._id ? newBill : bill)
        setBills(newBillsList); 
    }
    // ------------------------------ END OF FUNCTIONS ------------------------------

    useEffect(()=>{
        getPlans()
        getBills()
    }, [])
    // useEffect(() => {
    //     handleGetBills()
    //     getNextUpaidBill()

    // }, [])


    return(
        <section className="containerHome">
            {plans.length === 0 
                ? <EmptyDashboard 
                    user = {props.user}
                    server = {props.server}
                    addNewPlan = {addNewPlan}
                />
                : <>
                    <div className='homeNavBar'>
                        <p onClick={() => handleChangeView("Plan")}>Budget Tracker</p>
                        <p onClick={() => handleChangeView("Bills List")}>Bills List</p>
                    </div>
                    <div className='containerHomeView'>
                        {homeView === "Home"
                            ? <DashBoard 
                                // Plans
                                plans = {plans}
                                nextUnpaidBill = {nextUnpaidBill}
                                handleChangeView = {handleChangeView}
                                // Bills
                                bills = {bills}
                            />
                            : homeView === "Plan" 
                            ? <PlanList 
                                plans = {plans}
                                handleChangeView = {() =>handleChangeView("Add Plan")}
                            />
                            : homeView === "Add Plan" 
                            ? <AddPlan
                                user = {props.user}
                                server = {props.server}
                                addNewPlan = {addNewPlan}
                                handleChangeView = {() =>handleChangeView("Home")}
                            />
                            : homeView === "Bills List" 
                            ? <BillsList
                            server = {props.server}
                            user = {props.user}
                            bills = {bills}
                            handleChangeView = {props.handleChangeView}
                            handleShowPlan = {props.handleShowPlan}
                            setHomeView = {setHomeView}
                            setBills = {setBills}
                            setOpenBill = {setOpenBill}
                            />  
                            : homeView === "Add Bill"
                            ? <AddBill
                                user = {props.user}
                                server = {props.server}
                                addNewBill = {addNewBill}
                                handleChangeView = {() =>handleChangeView("Home")}
                            />
                            : homeView === "Show Bill"
                            ? <ShowBill
                                setHomeView = {props.handleChangeView}
                                openBill = {openBill}
                            />
                            : homeView === "Edit Bill" 
                            ? <EdditBill
                            openBill = {openBill}
                            server = {props.server}
                            handleChangeView = {props.handleChangeView} 
                            updateBills = {updateBills}
                            />
                            : <></>
                        }
                    </div>
                </> 
            }

        </section>
    )
}

export default Home