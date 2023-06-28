import Bill from "../../Components/Bill";

const MonthlyBill = (props) => {
    return props.bills?.map((bill, index) => 
        <Bill
            key={index + "-" + bill._id}
            bill={bill}
            handleShowBill = {() => props.handleShowBill(bill)}
            modifyBills = {props.modifyBills}
        />
    )
}

export default MonthlyBill;