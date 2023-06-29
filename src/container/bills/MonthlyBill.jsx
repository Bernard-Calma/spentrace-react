import Bill from "../../Components/Bill";

const MonthlyBill = (props) => {
    return props.bills?.map((bill, index) => 
        <Bill
            key={index + "-" + bill._id}
            bill={bill}
        />
    )
}

export default MonthlyBill;