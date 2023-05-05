import Bill from "../../Components/Bill";

const MonthlyBill = (props) => {
    return(
        <>
            {props.bills?.map((bill, index) => 
                new Date(bill.dueDate).getMonth() === props.month
                ? <>
                    <Bill
                        key={bill._id+'-'+props.month}
                        index={index}
                        bill={bill}
                        server = {props.server}
                        handleShowBill = {() => props.handleShowBill(bill)}
                        modifyBills = {props.modifyBills}
                    />
                </>
                : <></>
            )}
        </>
    );
};

export default MonthlyBill;