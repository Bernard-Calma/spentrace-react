import CircleGraph from "../../Components/CircleGraph";

const DashBoard = (props) => {
    return  <div className='dashboard'>
                <div className='containerPlansDashboard'>
                    <div className='graphSubTitle'>
                        <h2>Expense</h2>
                        <h2>${props.totalExpense}</h2>
                    </div>       
                    <CircleGraph
                        data = {[props.totalExpense, props.totalIncome]}
                        colors = {['red', 'green']}
                        width = {250}
                        height = {250}
                        value = {props.balance}
                    />
                    <div className='graphSubTitle'>
                        <h2>Income</h2>
                        <h2>${props.totalIncome}</h2>
                    </div>
                    <div className='containerNextTarget'>
                        <h2 className='nextTarget'>Next Target: ${Math.abs(props.nextTarget.amount).toFixed(2)}</h2>
                        <h2 className='nextTarget'>{props.nextTarget.name} - {new Date(props.nextTarget.date).toUTCString().slice(0, 11)}</h2>
                    </div>
                </div> 
                <h1 className='dashboardBillMonth'>{new Date().toLocaleString('en-us',{month: "long"})}</h1>
                {/* TODO: ADD FUNCTION TO SWITCH MONTHS */}
                <div className='cotnainerBillsDashboard'>
                    <div className='graphSubTitle'>
                        <h2>Paid</h2>
                        <h2>${props.totalBillsPaid}</h2>
                    </div>    
                    <CircleGraph 
                        data = {[props.totalBillsUnpaid, props.totalBillsPaid]}
                        colors = {['red', 'green']}  
                        width = {250}
                        height = {250}
                        value = {props.totalBillsUnpaid - props.totalBillsPaid}
                    />
                    <div className='graphSubTitle'>
                        <h2>Unpaid</h2>
                        <h2>${props.totalBillsUnpaid}</h2>
                    </div>
                    <div className='containerNextTarget'>
                        <h2 className='nextTarget'>Next Bill: ${Math.abs(props.nextUnpaidBill?.amount).toFixed(2)}</h2>
                        <h2 className='nextTarget'>{props.nextUnpaidBill?.name} - {new Date(props.nextUnpaidBill?.dueDate).toUTCString().slice(0, 11)}</h2>
                    </div>
                </div>               
            </div>
}

export default DashBoard;