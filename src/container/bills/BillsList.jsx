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
                            modifyBills = {props.modifyBills}
                        />
                        <Paid 
                            setHomeView = {props.setHomeView}
                            modifyBills = {props.modifyBills}
                        />
                    </div>
                </section>
            : billView === "Add Bill" ? <AddBill/>
            : billView === "Edit Bill"
                ? <EdditBill 
                    // openBill = {openBill}
                    server = {props.server}
                    // updateBill = {props.modifyBills.update}
                    return = {() => dispatch(changeView({billView: "Edit Bill"}))}
                />
            : billView === "Show Bill" ? <ShowBill/>
            : <></>
            }
        </>
    );
};

export default BillsList;