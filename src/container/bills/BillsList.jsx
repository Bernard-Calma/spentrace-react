import {  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMonthlyBills } from '../../features/billSlice'

import AddBill from '../add/AddBill'
import EdditBill from '../edit/EditBill'
import ShowBill from '../show/ShowBill'
import MonthHeader from './MonthHeader'
import Paid from './Paid'
import Unpaid from './Unpaid'

import './billsList.css'

const BillsList = () => {
    const dispatch = useDispatch();
    let {
        month,
        billItems
    } = useSelector(store => store.bill)
    const {billView} = useSelector(store => store.view)

    useEffect(() => {
        dispatch(setMonthlyBills());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month])

    useEffect(() => {
        dispatch(setMonthlyBills());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [billItems])

    return(
        <>
            {billView === "Bills List"
                ? <section className='containerBillsList'>
                    <MonthHeader/>
                    <div className="billsContainer">
                        <Unpaid/>
                        <Paid/>
                    </div>
                </section>
                : billView === "Add Bill" ? <AddBill/>
                : billView === "Edit Bill" ? <EdditBill/>
                : billView === "Show Bill" ? <ShowBill/>
                : <></>
            }
        </>
    );
};

export default BillsList;