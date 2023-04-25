import { useState } from "react";

const Loan = (props) => {
    const [account] = useState(props.account)
    const [loanAmount] = useState((account.loanAmount - account.balance) / account.loanAmount  * 100)
    const addComma = (numToString) => {
        numToString = numToString.toFixed(2).toString()
        for (let i = numToString.length - 6; i >= 0; i -= 3  ) {
            numToString = numToString.slice(0,i) + ',' + numToString.slice(i)
            
        }
        return numToString
    }
    return <div className='bankContainer'>
        <div className='listContainer loan bank'><h2>{account.bank}</h2></div>
        <div className='listContainer loan loanAmount'><h2>${addComma(account.loanAmount)}</h2></div>
        <div className='listContainer loan creditBalance'><h2>${addComma(account.balance)}</h2></div>
        <div className='listContainer loan minimumPayment'><h2>${account.minPayment.toFixed(2)}</h2></div>
        <div className='listContainer loan dueDate'><h2>{account.dueDate}</h2></div>
        <div className='listContainer loan interest'><h2>{account.interest}%</h2></div>
        <div className='listContainer loan paid'><h2>{loanAmount.toFixed(2)}%</h2></div>
    </div>
}

export default Loan;