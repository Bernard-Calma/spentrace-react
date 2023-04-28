import axios from 'axios'
import { useEffect, useState } from 'react'

import BillsList from '../bills/BillsList'
import PlanList from '../plan/PlansList'
import DashBoard from './Dashboard'
import EmptyDashboard from './EmptyDashboard'
import './home.css'
import '../../Components/NavBar.css'
import Loading from '../../Components/Loading'
import AccountList from '../accounts/AccountList'

const Home = (props) => {
    // ------------------------------ VARIABLES ------------------------------
    // Views
    let [homeView, setHomeView] = useState('Home')
    // Accounts
    const [accounts, setAccounts] = useState([])
    // Plans
    const [plans, setPlans] = useState([])
    // Bills
    const [bills, setBills] = useState([])
    // Loading
    const [loading, setLoading] = useState(true)
    // ------------------------------ END OF VARIABLES ------------------------------
    // ------------------------------ FUNCTIONS ------------------------------
    // Views
    const changeHomeView = view => {
        setHomeView(view)
        props.handleChangeHomeView("")
    }
    // Accounts
    const getAccounts = async () => {
        // Get all accounts from user
        await axios({ 
            method: "GET",
            url: `${props.server}/accounts`,
            withCredentials: true 
        })
        .then(res => setAccounts(res.data))
        .catch(err => console.log(err))
    }
    // Moidfy Accounts Methods
    const modifyAccounts =  {
        add: newAccount => setAccounts([...accounts, newAccount]),
        update: updatedAccount=> setAccounts(accounts.map(account => account._id === updatedAccount._id ? updatedAccount : account)),
        delete: deletedAccount => setAccounts(accounts.filter(account => deletedAccount._id !== account._id))
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
        .then(res => {
            setBills(res.data.sort((a, b) => (a.date > b.date) ? 1 : -1))
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            
        })
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
        getAccounts()
        getPlans()
        getBills()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {
                loading
                ? <div className='containerLoading'>
                    <Loading />
                </div>
                :         <section className="containerHome">
                {plans.length === 0 
                    ? <EmptyDashboard 
                        user = {props.user}
                        server = {props.server}
                        addNewPlan = {modifyPlans.add}
                    />
                    : <>
                        <div className='homeNavBar'>
                            <p onClick={() => changeHomeView("Plan")}>Budget</p>
                            <p onClick={() => changeHomeView("Bills List")}>Bills</p>
                            <p onClick={() => changeHomeView("Account List")}>Account</p>
                        </div>
                        <div className='containerHomeView'>
                            {homeView === "Home" || props.appView === "Home"
                                ? <DashBoard 
                                    plans = {plans}
                                    bills = {bills}
                                    changeHomeView = {changeHomeView}
                                />
                                : homeView === "Plan" 
                                ? <PlanList 
                                    user = {props.user}
                                    server = {props.server}
                                    plans = {plans}
                                    modifyPlans = {modifyPlans}
                                />
                                : homeView === "Bills List" 
                                ? <BillsList
                                    user = {props.user}
                                    server = {props.server}
                                    bills = {bills}
                                    modifyBills = {modifyBills}
                                />  
                                : homeView === "Account List" 
                                ? < AccountList
                                    user = {props.user}
                                    server = {props.server}
                                    accounts = {accounts}
                                    modifyAccounts = {modifyAccounts}
                                />  
                                : <></>
                            }
                        </div>
                    </> 
                }
            </section>
            }
        </>
    )
}

export default Home