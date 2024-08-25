import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlans } from '../../features/planSlice'
import { getBills } from '../../features/billSlice'
import { getAccounts } from '../../features/accountSlice'
import { changeView } from '../../features/viewSlice'

import BillsList from '../bills/BillsList'
import PlanList from '../plan/PlansList'
import DashBoard from './Dashboard'
import EmptyDashboard from './EmptyDashboard'
import AccountList from '../accounts/AccountList'

import './home.css'
import '../../Components/NavBar.css'
import Loading from '../../Components/Loading'

const Home = () => {
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
        homeView,
        planView,
        billView,
        accountView,
        showNav
    } = useSelector(store => store.view)
    // ------------------------------ END OF FUNCTIONS ------------------------------
    useEffect(()=>{
        dispatch(getPlans())
        dispatch(getBills())
        dispatch(getAccounts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
       <section className="containerHome">
            {
                planItems.length === 0 
                ? <>
                    {
                        isLoading 
                        ? <Loading/>
                        : <EmptyDashboard/>
                    } 
                </>
                : <>
                    <div className={`homeNavBar ${showNav}`}>
                        <p onClick={() => dispatch(changeView({
                            planView: homeView === "Plan" ? "Plan List" : planView,
                            homeView: "Plan",
                        }))}>Budget</p>
                        {billItems.length > 0 && 
                            <p onClick={() => dispatch(changeView(
                                {
                                    billView: homeView === "Bills List" ? "Bill List" : billView,
                                    homeView: "Bills List"
                            }))}>
                                Bills
                            </p>}
                            <p onClick={() => dispatch(changeView(
                                {
                                    homeView: "Account List",
                                    accountView: {view: homeView === "Account List" ? "Account List" : accountView.view}
                            }))}>
                                    Accounts
                            </p>
                    </div>
                    <div className='containerHomeView'>
                        {homeView === "Home" || view === "Home"
                            ? <DashBoard planItems = {planItems}/>
                            : homeView === "Plan" ? <PlanList/>
                            : homeView === "Bills List" ? <BillsList/>  
                            : homeView === "Account List" ? < AccountList/>  
                            : <></>
                        }
                    </div>
                </> 
            }             
        </section>
    )
}

export default Home