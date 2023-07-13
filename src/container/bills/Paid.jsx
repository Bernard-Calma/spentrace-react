import { useSelector } from "react-redux";
import MonthlyBill from "./MonthlyBill";

const Paid = () => {
    const {
        monthlyBills
    } = useSelector(store => store.bill)

    return (
        <>
            <div className='containerPaid'>
                <p>Paid: </p>
                <p className="positive">${monthlyBills.totalPaid.toFixed(2)}</p>
            </div>
            <MonthlyBill bills = {monthlyBills.paidList}/>
        </> 
    );
};

export default Paid;