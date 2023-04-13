import axios from 'axios'
import { useEffect, useState } from 'react'

import AddBill from '../add/AddBill'
import BillsList from '../bills/BillsList'
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
    const handleChangeView = view => {
        setHomeView(view)
        props.handleChangeHomeView()
    }
    // Plan
    const getPlans = async () => {
        // Get all plans from user
        await axios({ 
            method: "GET",
            url: `${props.server}/plans`,
            withCredentials: true 
        })
        .then(res => setPlans(res.data))
        .catch(err => console.log(err))
    }

    // Modify Plan Methods
    const modifyPlans = {
        add: newPlan => setPlans([...plans, newPlan].sort((a, b) => (a.date > b.date) ? 1 : -1)),
        update: updatedPlan => setPlans(plans.map(plan => plan._id === updatedPlan._id ? updatedPlan : plan)),
        delete: targetPlan => setPlans(plans.filter(plan => targetPlan._id !== plan._id))
    }

    // Bills
    const getBills = async () => {
        await axios({
            method: "GET",
            url: `${props.server}/bills`,
            headers: { 
                'Content-Type': 'application/json' 
            },
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <section className="containerHome">
            {plans.length === 0 
                ? <EmptyDashboard 
                    user = {props.user}
                    server = {props.server}
                    addNewPlan = {modifyPlans.add}
                />
                : <>
                    <div className='homeNavBar'>
                        <p onClick={() => handleChangeView("Plan")}>Budget Tracker</p>
                        <p onClick={() => handleChangeView("Bills List")}>Bills List</p>
                    </div>
                    <div className='containerHomeView'>
                        {homeView === "Home" || props.appView === "Home"
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
                                modifyPlans = {modifyPlans}
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