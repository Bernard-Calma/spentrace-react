import { useState } from "react";

const Loan = (props) => {
    const [account] = useState(props.account)
    const [loanAmount, setLoanAmount] = useState((account.loanAmount - account.balance) / account.loanAmount  * 100)
    return <div className='bankContainer'>
        <div className='listContainer loan bank'><h2>{account.bank}</h2></div>
        <div className='listContainer loan availableCredit'><h2>${account.loanAmount.toFixed(2)}</h2></div>
        <div className='listContainer loan creditBalance'><h2>${account.balance.toFixed(2)}</h2></div>
        <div className='listContainer loan minimumPayment'><h2>${account.minimumPayment.toFixed(2)}</h2></div>
        <div className='listContainer loan dueDate'><h2>{account.dueDate}</h2></div>
        <div className='listContainer loan interest'><h2>{account.interest}%</h2></div>
        <div className='listContainer loan paid'><h2>{loanAmount.toFixed(2)}%</h2></div>
    </div>
}

export default Loan;