import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlans } from '../../features/planSlice'
import { getBills } from '../../features/billSlice'
import { getAccounts } from '../../features/accountSlice'
import { changeView } from '../../features/viewSlice'

import BillsList from '../bills/BillsList'
import PlanList from '../plan/PlansList'
import DashBoard from './Dashboard'
import EmptyDashboard from './EmptyDashboard'
import Loading from '../../Components/Loading'
import AccountList from '../accounts/AccountList'

import './home.css'
import '../../Components/NavBar.css'

const Home = props => {
    const dispatch = useDispatch();
    // ------------------------------ VARIABLES ------------------------------
    // Plans
    const {planItems} = useSelector(store => store.plan)
    // Bills
    const {
        billItems, 
        isLoading
    } = useSelector(store => store.bill)
    // Views
    const {
        view,
        homeView
    } = useSelector(store => store.view)
    // Accounts
    const [accounts, setAccounts] = useState([]);
    // ------------------------------ END OF VARIABLES ------------------------------
 
    // ------------------------------ FUNCTIONS ------------------------------
    // Moidfy Accounts Methods
    const modifyAccounts =  {
        add: newAccount => setAccounts([...accounts, newAccount]),
        update: updatedAccount=> setAccounts(accounts.map(account => account._id === updatedAccount._id ? updatedAccount : account)),
        delete: deletedAccount => setAccounts(accounts.filter(account => deletedAccount._id !== account._id))
    }

    // ------------------------------ END OF FUNCTIONS ------------------------------
    useEffect(()=>{
        dispatch(getPlans())
        dispatch(getBills())
        dispatch(getAccounts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {
                isLoading
                ? <div className='containerLoading'>
                    <Loading />
                </div>
                : <section className="containerHome">
                    {planItems.length === 0 
                        ? <EmptyDashboard/>
                        : <>
                            <div className='homeNavBar'>
                                <p onClick={() => dispatch(changeView({homeView: "Plan"}))}>Budget</p>
                                {billItems.length > 0 && <p onClick={() => dispatch(changeView({homeView: "Bills List"}))}>Bills</p>}
                                <p onClick={() => dispatch(changeView({homeView: "Account List"}))}>Accounts</p>
                            </div>
                            <div className='containerHomeView'>
                                {homeView === "Home" || view === "Home"
                                    ? <DashBoard/>
                                    : homeView === "Plan" ? <PlanList/>
                                    : homeView === "Bills List" ? <BillsList/>  
                                    : homeView === "Account List" 
                                    ? < AccountList
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