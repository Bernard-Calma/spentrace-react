import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlans } from '../../features/planSlice'
import { getBills } from '../../features/billSlice'
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
    // Plans
    const {planItems} = useSelector(store => store.plan)
    // Bills
    const {
        billItems, 
        isLoading
    } = useSelector(store => store.bill)
    // Views
    let [homeView, setHomeView] = useState('Home');
    // Accounts
    const [accounts, setAccounts] = useState([]);
    // ------------------------------ END OF VARIABLES ------------------------------
    // REDUX
    const dispatch = useDispatch();
    // REDUX
    // ------------------------------ FUNCTIONS ------------------------------
    // Views
    const changeHomeView = view => {
        setHomeView(view);
        props.handleChangeHomeView("");
    };
    // Accounts
    const getAccounts = async () => {
        // Get all accounts from user
        await axios({ 
            method: "GET",
            url: `${props.server}/accounts`,
            withCredentials: true 
        })
        .then(res => setAccounts(res.data))
        .catch(err => console.log(err));
    }
    // Moidfy Accounts Methods
    const modifyAccounts =  {
        add: newAccount => setAccounts([...accounts, newAccount]),
        update: updatedAccount=> setAccounts(accounts.map(account => account._id === updatedAccount._id ? updatedAccount : account)),
        delete: deletedAccount => setAccounts(accounts.filter(account => deletedAccount._id !== account._id))
    }
    // Modify Plans Methods
    // const modifyPlans = {
    //     add: newPlan => setPlans([...plans, newPlan].sort((a, b) => (a.date > b.date) ? 1 : -1)),
    //     update: updatedPlan => setPlans(plans.map(plan => plan._id === updatedPlan._id ? updatedPlan : plan).sort((a, b) => (a.date > b.date) ? 1 : -1)),
    //     delete: targetPlan => setPlans(plans.filter(plan => targetPlan._id !== plan._id).sort((a, b) => (a.date > b.date) ? 1 : -1))
    // }
    // Bills

    // Modify Bills Methods
    // const modifyBills = {
    //     add: newBill => setBills([...bills, newBill].sort((a, b) => (a.date > b.date) ? 1 : -1)),
    //     update: updatedBill => setBills(bills.map(bill => bill._id === updatedBill._id ? updatedBill : bill)),
    //     delete: targetBill => setBills(bills.filter(bill => targetBill._id !== bill._id))
    // }
    // ------------------------------ END OF FUNCTIONS ------------------------------
    useEffect(()=>{
        dispatch(getPlans())
        dispatch(getBills())
        getAccounts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {
                isLoading
                ? <div className='containerLoading'>
                    <Loading />
                </div>
                :         <section className="containerHome">
                {planItems.length === 0 
                    ? <EmptyDashboard 
                        user = {props.user}
                        server = {props.server}
                        // addNewPlan = {modifyPlans.add}
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
                                    plans = {planItems}
                                    bills = {billItems}
                                    changeHomeView = {changeHomeView}
                                />
                                : homeView === "Plan" 
                                ? <PlanList 
                                    user = {props.user}
                                    server = {props.server}
                                    plans = {planItems}
                                    // modifyPlans = {modifyPlans}
                                />
                                : homeView === "Bills List" 
                                ? <BillsList
                                    user = {props.user}
                                    server = {props.server}
                                    bills = {billItems}
                                    // modifyBills = {modifyBills}
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