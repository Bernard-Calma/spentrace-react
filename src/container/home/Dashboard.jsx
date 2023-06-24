import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../features/planSlice";
import { getNextBill } from "../../features/billSlice";

import CircleGraph from "../../Components/CircleGraph";
const DashBoard = (props) => {
    const dispatch = useDispatch();
    // VARIABLES
    // Plans
    const {
        balance, 
        totalIncome, 
        totalExpense, 
        nextTarget
    } = useSelector(store => store.plan)
    // Bills
    const {
        billItems,
        totalBillsPaid,
        totalBillsUnpaid,
        nextUnpaidBill
    } = useSelector(store => store.bill)
   // ------------------------------ END OF VARIABLES ------------------------------

   useEffect(() => {
        dispatch(getBalance());
        dispatch(getNextBill());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.plans]);
    
    return (
        <div className='dashboard'>
            <h1 className='dashboardBillMonth'>{new Date().toLocaleString('en-us',{month: "long"})} Budget</h1>
            <div className='containerDashboard'>
                <div className="dashboardGraph">
                <div className='graphSubTitle'>
                    <h2>Income</h2>
                    <h2>${Math.ceil(totalIncome)}</h2>
                </div>

                {/* PLAN GRAPH */}
                <CircleGraph
                    data = {[totalExpense, totalIncome]}
                    colors = {['red', 'green']}
                    width = {250}
                    height = {250}
                    value = {balance}
                />
                <div className='graphSubTitle'>
                    <h2>Expense</h2>
                    <h2>${Math.ceil(totalExpense)}</h2>
                </div>    
                </div>
                {/* Show add if balance is positive */}
                {nextTarget.amount === 0
                    ? <div className="containerEmptyPlan">
                        <h2>Add an expense</h2>
                        <i 
                            className="fi fi-rr-add addEmptyDashboard" 
                            onClick={() => props.handleChangeView("Add Plan")}
                        />
                    </div>
                    : <div className='containerNextTarget'>
                        <h2 className='nextTarget'>Next Target: ${Math.abs(nextTarget.amount).toFixed(2)}</h2>
                        <h2 className='nextTarget'>{nextTarget.name} - {new Date(nextTarget.date).toUTCString().slice(0, 11)}</h2>
                        {/* Shorten the if statement */}
                        <h2 className={`nextTarget ${((Date.parse(nextTarget.date) - Date.parse(new Date())) / 24 / 60 / 60 / 1000) > 0 ? "positive" : "negative"}`}> Days Remaining: {(Date.parse(nextTarget.date) - Date.parse(new Date())) / 24 / 60 / 60 / 1000 > 0 ? Math.ceil((Date.parse(nextTarget.date) - Date.parse(new Date())) / 24 / 60 / 60 / 1000) :  'Overdue' }</h2>
                    </div>
                }
            </div> 
            {billItems.length === 0
                ? <div className="containerEmptyPlan">
                    <h2>ADD YOUR FIRST BILL</h2>
                    <i 
                        className="fi fi-rr-add addEmptyDashboard" 
                        onClick={() => props.changeHomeView("Bills List")}
                    />
                </div>
                : <>
                    <h1 className='dashboardBillMonth'>{new Date().toLocaleString('en-us',{month: "long"})} Bills</h1>
                    <div className='containerDashboard'>
                        <div className="dashboardGraph">
                            <div className='graphSubTitle'>
                                <h2>Paid</h2>
                                <h2>${totalBillsPaid}</h2>
                            </div>    
                            {/* BILLS GRAPH */}
                            <CircleGraph 
                                data = {[totalBillsUnpaid, totalBillsPaid]}
                                colors = {['red', 'green']}  
                                width = {250}
                                height = {250}
                                value = {totalBillsUnpaid + totalBillsPaid}
                            />
                            <div className='graphSubTitle'>
                                <h2>Unpaid</h2>
                                <h2>${totalBillsUnpaid}</h2>
                            </div>
                        </div>
                        {totalBillsUnpaid === 0 
                            ? <div className='containerNextTarget'>
                                <h2 className='nextTarget'>All Bills are paid this month.</h2>
                            </div>
                            : <div className='containerNextTarget'>
                                <h2 className='nextTarget'>Next Bill: ${Math.abs(nextUnpaidBill?.amount).toFixed(2)}</h2>
                                <h2 className='nextTarget'>{nextUnpaidBill?.name} - {new Date(nextUnpaidBill?.dueDate).toUTCString().slice(0, 11)}</h2>
                                <h2 className={`nextTarget ${(Date.parse(nextUnpaidBill.dueDate) - Date.parse(new Date())) / 24 / 60 / 60 / 1000 > 0 ? "positive" : "negative"}`}> Days Remaining: {(Date.parse(nextUnpaidBill.dueDate) - Date.parse(new Date())) / 24 / 60 / 60 / 1000 > 0 ? Math.ceil((Date.parse(nextUnpaidBill.dueDate) - Date.parse(new Date())) / 24 / 60 / 60 / 1000) :  'Overdue' }</h2>
                            </div>
                        }
                    </div>              
                </>
            } 
        </div>
    );
};

export default DashBoard;