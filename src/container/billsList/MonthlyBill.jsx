import { useState, useEffect } from "react";

const MonthlyBill = (props) => {
    // Paid
    let [totalPaid, setTotalPaid] = useState(0);
    let [totalUnpaid, setTotalUnpaid] = useState(0);
    
    const getTotalPaid = () => {
        let paid = 0;
        let unpaid = 0;
        props.bills.forEach(element => {
            if (element.paid) paid += element.amount
            else unpaid += element.amount
        });
        setTotalPaid(paid)
        setTotalUnpaid(unpaid)
    }

    useEffect(()=> {
        getTotalPaid()
    },[])
    return(
        <div className="containerPaidUnpaid">
            <div className='containerPaid'>
                <p>Unaid: </p>
                <p>${totalPaid.toFixed(2)}</p>
            </div>
            <div className='containerPaid'>
                    <p>Paid: </p>
                    <p>${totalUnpaid.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default MonthlyBill;