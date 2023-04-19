import {  useState } from 'react'
import AddBill from '../add/AddBill'
import EdditBill from '../edit/EditBill'
import ShowBill from '../show/ShowBill'
import './billsList.css'
import MonthHeader from './MonthHeader'
import Paid from './Paid'
import Unpaid from './Unpaid'

const BillsList = (props) => {
    const [monthNames] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    let [month, setMonth] = useState(new Date().getMonth())
    let [monthText, setMonthText] = useState(monthNames[month])
    let [billsView, setBillsView] = useState("Bills List")
    let [openBill, setOpenBill] = useState({})


    const changeBillsView = view => setBillsView(view);

    const handleShowBill = (bill) => {
        setOpenBill(bill)
        setBillsView("Show Bill")
    }

    const handlePrevMonth = () => {
        if (month === 0) setMonth(11)
        else setMonth(month -= 1)
        setMonthText(monthNames[month])
    }
    
    const handleNextMonth = () => {
        if (month === 11) setMonth(0)
        else setMonth(month += 1)
        setMonthText(monthNames[month])
    }

    const getMonthlyBill = (month) => {
        let monthBills = []
        // Add filter if month is included on due date array
        // console.log(month)
        // Iterate each bill
        props.bills.forEach(bill => {
            // Iterate each due date
            bill.dueDate.forEach(dueDate => {
                // add a single bill with specific due date
                if(dueDate.month === month) monthBills.push({...bill, dueDate: dueDate})
            })
        })         
        return monthBills
    } 

    return(<>{
        billsView === "Bills List"
        ? <section className='containerBillsList'>
        <MonthHeader 
            monthText = {monthText}
            handlePrevMonth = {handlePrevMonth}
            handleNextMonth = {handleNextMonth}
        />
        <div className="billsContainer">
            <Unpaid 
                month = {month}
                bills = {getMonthlyBill(month)}
                handleShowBill = {handleShowBill}
                changeBillsView = {changeBillsView}
                setHomeView = {props.setHomeView}
            />
            <Paid 
                month = {month}
                bills = {getMonthlyBill(month)}
                changeBillsView = {changeBillsView}
                handleShowBill = {handleShowBill}
                setHomeView = {props.setHomeView}
            />
        </div>
        </section>
        : billsView === "Add Bill"
        ?<AddBill 
            user = {props.user}
            server = {props.server}
            bills = {props.bills}
            changeBillsView = {() => changeBillsView("Bills List")}
            handleAddBill = {props.modifyBills.add}
        />
        : billsView === "Edit Bill"
        ? <EdditBill 
            openBill = {openBill}
            server = {props.server}
            updateBill = {props.modifyBills.update}
            return = {() => changeBillsView("Bills List")}
        />
        : billsView === "Show Bill"
        ? <ShowBill 
            openBill = {openBill}
            server = {props.server}
            deleteBill = {props.modifyBills.delete}
            edit = {() => changeBillsView("Edit Bill")}
            return = {() => changeBillsView("Bills List")}
        />
        : <></>
    }</>)
}

export default BillsList