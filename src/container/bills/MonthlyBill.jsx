import Bill from "../../Components/Bill";

const MonthlyBill = (props) => {

    return(
        <>
            {
                props.bills?.map((bill, index) => 
                    bill.dueDate.month === props.month ?
                    <>
                        <Bill
                            key={`${bill._id}-${index}`}
                            index={index}
                            bill={bill}
                            handleShowBill = {() => props.handleShowBill(bill)}
                        />
                    </>
                    : <></>)
            }
        </>
    )
}

export default MonthlyBill;