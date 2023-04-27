import { useEffect, useState } from 'react'
import './AccountList.css'
import Account from './Account';
import CreditCard from './CreditCard';
import Loan from './Loan';
import AddAccount from '../add/AddAccount';
import ShowAccount from '../show/ShowAccount';
import EditAccount from '../edit/EditAccount';

const AccountList = (props) => {
    // Variables
    const [accountCategory, setAccountCategory] = useState({
        checking: [],
        savings: [],
        creditCard: [],
        loan: []
    })
    const [openAcc, setOpenAcc] = useState({})
    const [view, setView] = useState("Account List")
    
    // GET
    const handleAccountCategory = () => {
        const accsCheckings = []
        const accsSavings = []
        const accsCreditCard = []
        const accsLoan = []
        props.accounts.forEach(account => {
            switch(account.accType) {
                case 'Checking': 
                    accsCheckings.push(account)
                    break;
                case 'Savings':
                    accsSavings.push(account)
                    break;
                case 'Credit Card':
                    accsCreditCard.push(account)
                    break;
                case 'Loan':
                    accsLoan.push(account)
                    break;
                default:
                    break;
            }
        })

        setAccountCategory({
            checking: accsCheckings,
            savings: accsSavings,
            creditCard: accsCreditCard,
            loan: accsLoan
        })
    }

    // View
    const handleChangeView = (view) => {
        setView(view)
    }

    const handleShowAcc = (account) => {
        setOpenAcc(account)
        setView("Show")
    }

    // Number modifiers
    const addComma = (numToString) => {
        if (numToString > 999) {
            numToString = numToString.toFixed(2).toString()
            for (let i = numToString.length - 6; i >= 0; i -= 3  ) {
                numToString = numToString.slice(0,i) + ',' + numToString.slice(i)
                
            }
        }
        return numToString
    }

    useEffect(()=>{
        handleAccountCategory()
    }, [props.accounts])
    return <div className="sectionAccountList">
        <i className="fi fi-rr-add account" onClick={() => handleChangeView("Add")}></i>
        {
            view === "Account List"?
            <>
                {
                accountCategory.checking.length > 0 &&
                <section className='sectionChecking account'>
                    <h1>Checking Accounts</h1>
                    <div className='categoriesContainer account'>
                        <div className='listContainer account bank'><h2>Bank</h2></div>
                        <div className='listContainer account accountNumber'><h2>Account Number</h2></div>
                        <div className='listContainer account accountBalance'><h2>Balance</h2></div>
                    </div>
                    <div className='accountContainer'>
                        {
                            accountCategory.checking.map((account, index) => 
                                <Account 
                                    key = {index}
                                    account = {account}
                                    handleShowAcc = {() => handleShowAcc(account)}
                                />
                            )
                        }
                    </div>
                </section>
            }
            {
                accountCategory.savings.length > 0 &&
                <section className='sectionSavings account'>
                    <h1>Savings Accounts</h1>
                    <div className='categoriesContainer account'>
                        <div className='listContainer account bank'><h2>Bank</h2></div>
                        <div className='listContainer account accountNumber'><h2>Account Number</h2></div>
                        <div className='listContainer account accountBalance'><h2>Balance</h2></div>
                    </div>
                    <div className='accountContainer'>
                        {
                            accountCategory.savings.map((account, index) => 
                                <Account 
                                    key = {index}
                                    account = {account}
                                    handleShowAcc = {() => handleShowAcc(account)}
                                />
                            )
                        }
                    </div>
                </section>
            }
            {
                accountCategory.creditCard.length > 0 &&
                <section className='sectionCredit account'>
                    <h1>Credit Card Accounts</h1>
                    <div className='categoriesContainer credit'>
                        <div className='listContainer credit bank'><h2>Bank</h2></div>
                        <div className='listContainer credit accountNumber'><h2>Account Number</h2></div>
                        <div className='listContainer credit availableCredit'><h2>Available Credit</h2></div>
                        <div className='listContainer credit creditBalance'><h2>Balance</h2></div>
                        <div className='listContainer credit minimumPayment'><h2>Minimum Payment</h2></div>
                        <div className='listContainer credit dueDate'><h2>Due Date</h2></div>
                        <div className='listContainer credit interest'><h2>Interest</h2></div>
                        <div className='listContainer credit usage'><h2>Usage</h2></div>
                    </div>
                    {
                        accountCategory.creditCard.map((account, index) => 
                            <CreditCard 
                                key = {index}
                                account = {account}
                                addComma = {addComma}
                                handleShowAcc = {() => handleShowAcc(account)}
                            />
                        )
                    }
                </section>
            }
            {
                accountCategory.loan.length > 0 &&
                <section className='sectionLoan account'>
                    <h1>Credit Card Accounts</h1>
                    <div className='categoriesContainer loan'>
                        <div className='listContainer loan bank'><h2>Bank</h2></div>
                        <div className='listContainer loan availableCredit'><h2>Loan Amount</h2></div>
                        <div className='listContainer loan creditBalance'><h2>Balance</h2></div>
                        <div className='listContainer loan minimumPayment'><h2>Minimum Payment</h2></div>
                        <div className='listContainer loan dueDate'><h2>Due Date</h2></div>
                        <div className='listContainer loan interest'><h2>Interest</h2></div>
                        <div className='listContainer loan paid'><h2>Paid</h2></div>
                    </div>
                    {
                        accountCategory.loan.map((account, index) => 
                            <Loan 
                                key = {index}
                                account = {account} 
                                addComma = {addComma}
                                handleShowAcc = {() => handleShowAcc(account)}
                            />
                        )
                    }
                </section>
            }
            </>
            : view === "Add"?
            <AddAccount 
                server = {props.server}
                add = {props.modifyAccounts.add}
                return = {() => handleChangeView("Account List")}
            />
            : view === "Show"?
            <ShowAccount 
                openAcc = {openAcc}
                server = {props.server}
                addComma = {addComma}
                return = {() => handleChangeView("Account List")}
                edit = {() => handleChangeView("Edit")}
            />
            : view === "Edit"?
            <EditAccount 
                openAcc = {openAcc}
                server = {props.server}
                addComma = {addComma}
                update = {props.modifyAccounts.update}
                return = {() => handleChangeView("Account List")}
            />
            : <></>
        }
        
    </div>
}

export default AccountList