import axios from 'axios'
import { useEffect, useState } from 'react'

import AddBill from '../add/AddBill'
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
    // ------------------------------ END OF VARIABLES ------------------------------

    // FUNCTIONS
    // Views
    const handleChangeView = view => setHomeView(view)
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

    const addNewPlan = newPlan => setPlans([...plans, newPlan])
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

    const addNewBill = newBill => setPlans([...bills, newBill])
    
    const updateBills = newBill => setBills(bills.map((bill)=> bill._id === newBill._id ? newBill : bill)); 
    // ------------------------------ END OF FUNCTIONS ------------------------------

    useEffect(()=>{
        getPlans()
        getBills()
    }, [])

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
                                handleChangeView = {handleChangeView}
                                // Bills
                                bills = {bills}
                            />
                            : homeView === "Plan" 
                            ? <PlanList 
                                user = {props.user}
                                server = {props.server}
                                plans = {plans}
                                handleChangeView = {() =>handleChangeView("Add Plan")}
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
                            />
                            : homeView === "Edit Bill" 
                            ? <EdditBill
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