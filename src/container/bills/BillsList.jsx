import {  useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeView } from '../../features/viewSlice'

import AddBill from '../add/AddBill'
import EdditBill from '../edit/EditBill'
import ShowBill from '../show/ShowBill'
import MonthHeader from './MonthHeader'
import Paid from './Paid'
import Unpaid from './Unpaid'

import './billsList.css'
import { setMonthlyBills } from '../../features/billSlice'

const BillsList = (props) => {
    const dispatch = useDispatch();
    let {
        month
    } = useSelector(store => store.bill)
    const {billView} = useSelector(store => store.view)
    let [openBill, setOpenBill] = useState({});

    const changeBillsView = view => dispatch(changeView({billView: view}))

    const handleShowBill = bill => {
        setOpenBill(bill);
        dispatch(changeView({billView: "Show Bill"}))
    }

    useEffect(() => {
        dispatch(setMonthlyBills());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month])

    return(
        <>
            {billView === "Bill List"
                ? <section className='containerBillsList'>
                    <MonthHeader/>
                    <div className="billsContainer">
                        <Unpaid 
                            setHomeView = {props.setHomeView}
                            handleShowBill = {handleShowBill}
                            changeBillsView = {changeBillsView}
                            modifyBills = {props.modifyBills}
                        />
                        <Paid 
                            setHomeView = {props.setHomeView}
                            changeBillsView = {changeBillsView}
                            handleShowBill = {handleShowBill}
                            modifyBills = {props.modifyBills}
                        />
                    </div>
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