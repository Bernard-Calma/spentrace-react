import axios from 'axios'
import { useEffect, useState } from 'react'

import BillsList from '../bills/BillsList'
import PlanList from '../plan/PlansList'
import DashBoard from './Dashboard'
import EmptyDashboard from './EmptyDashboard'
import './home.css'

const Home = (props) => {
    // ------------------------------ VARIABLES ------------------------------
    // Views
    let [homeView, setHomeView] = useState('Home')
    // Plans
    const [plans, setPlans] = useState([])
    // Bills
    const [bills, setBills] = useState([])
    // ------------------------------ END OF VARIABLES ------------------------------
    // ------------------------------ FUNCTIONS ------------------------------
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
        .then(res => setPlans(res.data.sort((a, b) => (a.date > b.date) ? 1 : -1)))
        .catch(err => console.log(err))
    }
    // Modify Plans Methods
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
            withCredentials: true
        })
        .then(res => setBills(res.data.sort((a, b) => (a.date > b.date) ? 1 : -1)))
        .catch(err => console.log(err))
    } 
    // Modify Bills Methods
    const modifyBills = {
        add: newBill => setBills([...bills, newBill].sort((a, b) => (a.date > b.date) ? 1 : -1)),
        update: updatedBill => setBills(bills.map(bill => bill._id === updatedBill._id ? updatedBill : bill)),
        delete: targetBill => setBills(bills.filter(bill => targetBill._id !== bill._id))
    }
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
                                modifyBills = {modifyBills}
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