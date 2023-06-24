import { useEffect, useState } from "react";
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
        totalBillsPaid,
        totalBillsUnpaid
    } = useSelector(store => store.bill)
   const [nextUnpaidBill , setNextUnpaidBill] = useState({});
    // ------------------------------ END OF VARIABLES ------------------------------

    // FUNCTIONS
    // Plans
    // Bills

    const getNextUnpaidBill = () => {
        // set a temp unpaid bill
        const firstBill = props.bills[0]
        // console.log(firstBill.paid.indexOf(false))
        let firstFalseIndex = firstBill.paid.indexOf(false)
        // If firstfalseindex is negative (bill is not on repeat)
        firstFalseIndex = firstFalseIndex === -1 ? 0 : firstFalseIndex
        let unpaidBill = {
            name: firstBill.name,
            amount: firstBill.amount,
            dueDate: firstBill.dueDate[firstFalseIndex],
            paid: firstBill.paid[firstFalseIndex]
        }
        // console.log(unpaidBill)
        const currentMonth = new Date().getMonth();
        // Get the first bill that has a due date for the current year and month that is not paid
        props.bills.forEach(bill => {
            bill.dueDate.forEach((dueDate, index) => {
                let billMonth = new Date(dueDate).getMonth()
                if (billMonth === currentMonth) {
                    if(!bill.paid[index] && billMonth === currentMonth && new Date(dueDate).getFullYear() === new Date().getFullYear()) {
                        if(dueDate < unpaidBill.dueDate) {
                            // console.log(bill)
                            unpaidBill = {
                                name: bill.name,
                                amount: bill.amount,
                                dueDate: dueDate,
                                paid: bill.paid[index]
                            };
                        }
                    };
                };
            });
        });
        setNextUnpaidBill(unpaidBill);
    }
    // ------------------------------ END OF FUNCTIONS ------------------------------

    useEffect(() => {
        dispatch(getBalance());
        dispatch(getNextBill());
        getNextUnpaidBill();
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
            {props.bills.length === 0
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