import Bill from "../../Components/Bill";

const MonthlyBill = (props) => {

    return(
        <>
            {
                props.bills?.map((bill, index) => 
                    new Date(bill.dueDate).getMonth() === props.month ?
                    <>
                        <Bill
                        key={bill._id}
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