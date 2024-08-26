import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlans } from '../../features/planSlice'
import { getBills } from '../../features/billSlice'
import { getAccounts } from '../../features/accountSlice'
import { changeView, toggleNavBar } from '../../features/viewSlice'

import BillsList from '../bills/BillsList'
import PlanList from '../plan/PlansList'
import DashBoard from './Dashboard'
import EmptyDashboard from './EmptyDashboard'
import AccountList from '../accounts/AccountList'

import './home.css'
import '../../Components/NavBar.css'
import Loading from '../../Components/Loading'
import Icon from '../../common/Icon'

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

    const hadleChangeView = view => {
        switch (view) {
            case "Plan List":
                dispatch(changeView({
                    homeView: "Plan",
                    planView: "Plan List"
                }))
                break;
            case "Bills List":
                dispatch(changeView({
                    homeView: "Bills List",
                    billView: "Bills List"
                }))
                break;
            case "Account List":
                dispatch(changeView({
                    homeView: "Account List",
                    billView: "Account List"
                }))
                break;
            default:
                break;
        }
        dispatch(toggleNavBar())
    }
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
                    <Icon 
                        className="fi fi-rr-bars-staggered" 
                        onClick={() => dispatch(toggleNavBar())} 
                    />
                    <div className={`homeNavBar ${showNav}`}>
                        <p  className={`navItem ${homeView === "Plan" ? "selected" : ''}`}
                            onClick={() => hadleChangeView("Plan List")}>Budget</p>
                        {billItems.length > 0 && 
                            <p className={`navItem ${homeView === "Bills List" ? "selected" : ''}`}
                                onClick={() => hadleChangeView("Bills List")}>
                                Bills
                            </p>}
                            <p  className={`navItem ${homeView === "Account List" ? "selected" : ''}`}
                                onClick={() => hadleChangeView("Account List")}>
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