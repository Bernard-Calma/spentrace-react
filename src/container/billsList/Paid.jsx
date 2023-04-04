import { useState, useEffect } from "react";

const Paid = (props) => {
    let [totalPaid, setTotalPaid] = useState(0);
 
    const getTotalPaid = () => {
        let paid = 0;
        props.bills.forEach(element => {
            if (element.paid) paid += element.amount
        });
        setTotalPaid(paid)
    }

    useEffect(()=> {
        getTotalPaid()
    },[props.bills])
    return  <div className='containerPaid'>
                    <p>Paid: </p>
                    <p>${totalPaid.toFixed(2)}</p>
            </div>

}

export default Paid;