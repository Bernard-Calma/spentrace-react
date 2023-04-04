import { useState, useEffect } from "react";

const Unpaid = (props) => {
    let [totalUnpaid, setTotalUnpaid] = useState(0);
 
    const getTotalPaid = () => {
        let unpaid = 0;
        props.bills.forEach(element => {
            if (!element.paid) unpaid += element.amount
        });
        setTotalUnpaid(unpaid)
    }

    useEffect(()=> {
        getTotalPaid()
    },[props.bills])
    return  <div className='containerPaid'>
                    <p>Paid: </p>
                    <p>${totalUnpaid.toFixed(2)}</p>
            </div>

}

export default Unpaid;