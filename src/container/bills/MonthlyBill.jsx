import Bill from "../../Components/Bill";

const MonthlyBill = (props) => {
    return props.bills?.map((bill, index) => 
        <Bill
            key={bill._id}
            index={index}
            bill={bill}
            handleShowBill = {() => props.handleShowBill(bill)}
            modifyBills = {props.modifyBills}
        />
    )
}

export default MonthlyBill;