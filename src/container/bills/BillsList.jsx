import {  useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddBill from '../add/AddBill'
import EdditBill from '../edit/EditBill'
import ShowBill from '../show/ShowBill'
import MonthHeader from './MonthHeader'
import Paid from './Paid'
import Unpaid from './Unpaid'

import './billsList.css'
import { setMonth } from '../../features/billSlice'
import { changeView } from '../../features/viewSlice'

const BillsList = (props) => {
    const dispatch = useDispatch();
    let {billItems} = useSelector(store => store.bill)
    const {billView} = useSelector(store => store.view)
    let [openBill, setOpenBill] = useState({});

    const changeBillsView = view => dispatch(changeView({billView: view}))

    const handleShowBill = bill => {
        setOpenBill(bill);
        dispatch(changeView({billView: "Show Bill"}))
    }

    const getMonthlyBill = month => {
        let monthBills = []
        // Add filter if month is included on due date array
        // console.log(month)
        // Iterate each bill
        billItems.forEach(bill => {
            // Iterate each due date
            bill.dueDate.forEach((dueDate, index) => {
                // add a single bill with specific due date
                // NOTE TO DO: CHANGE CURRENT YEAR FOR USER TO SELECT ANY YEAR AND SHOW BILLS ACCORDING TO YEAR
                if(new Date(dueDate).getMonth() === month && new Date(dueDate).getFullYear() === new Date().getFullYear()) 
                    monthBills.push({...bill, dueDate: dueDate, paid: bill.paid[index], dueDateIndex: index});
            });
        });      
        return monthBills.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);
    } 

    return(
        <>
            {billView === "Bill List"
                ? <section className='containerBillsList'>
                    <MonthHeader/>
                    {/* <div className="billsContainer">
                        <Unpaid 
                            month = {month}
                            setHomeView = {props.setHomeView}
                            server = {props.server}
                            handleShowBill = {handleShowBill}
                            changeBillsView = {changeBillsView}
                            bills = {getMonthlyBill(month)}
                            modifyBills = {props.modifyBills}
                            
                        />
                        <Paid 
                            month = {month}
                            setHomeView = {props.setHomeView}
                            server = {props.server}
                            changeBillsView = {changeBillsView}
                            handleShowBill = {handleShowBill}
                            bills = {getMonthlyBill(month)}
                            modifyBills = {props.modifyBills}
                        />
                    </div> */}
                </section>
            : billView === "Add Bill"
                ? <AddBill 
                    user = {props.user}
                    server = {props.server}
                    bills = {props.bills}
                    changeBillsView = {() => changeBillsView("Bills List")}
                    handleAddBill = {props.modifyBills.add}
                />
            : billView === "Edit Bill"
                ? <EdditBill 
                    openBill = {openBill}
                    server = {props.server}
                    // updateBill = {props.modifyBills.update}
                    return = {() => changeBillsView("Bills List")}
                />
            : billView === "Show Bill"
                ? <ShowBill 
                    openBill = {openBill}
                    server = {props.server}
                    deleteBill = {props.modifyBills.delete}
                    edit = {() => changeBillsView("Edit Bill")}
                    return = {() => changeBillsView("Bills List")}
                />
            : <></>
            }
        </>
    );
};

export default BillsList;