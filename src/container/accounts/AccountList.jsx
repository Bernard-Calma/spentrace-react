import { useEffect, useState } from 'react'
import './AccountList.css'
import Account from './Account';
import CreditCard from './CreditCard';
import Loan from './Loan';
import AddAccount from './AddAccount';

const accountList = [
    {
        bank: "Bank of America",
        accountNumber: 1,
        balance: -256.23,
        type: "Checking",
        accountOpened: "",
    },
    {
        bank: "Capital One",
        accountNumber: 2,
        balance: 200,
        type: "Checking",
        accountOpened: "",
    },
    {
        bank: "Bank of America",
        accountNumber: 3,
        balance: 50,
        type: "Savings",
        accountOpened: "",
    },
    {
        bank: "Capital One",
        accountNumber: 4,
        balance: 100,
        type: "Savings",
        accountOpened: "",
    },
    {
        bank: "Capital One",
        accountNumber: 5,
        type: "Credit Card",
        accountOpened: "",
        creditLimit: 1000,
        balance: 500,
        availableCredit: 500,
        minimumPayment: 50,
        interest: 4.99,
        dueDate: "8"
    },
    {
        bank: "Bank of America",
        accountNumber: 6,
        type: "Credit Card",
        accountOpened: "",
        creditLimit: 500,
        balance: 300,
        availableCredit: 200,
        minimumPayment: 30,
        interest: 4.99,
        dueDate: "9"
    },
    {
        bank: "Upstart",
        type: "Loan",
        accountOpened: "",
        loanAmount: 6000,
        balance: 4000.50,
        minimumPayment: 275,
        interest: 4.99,
        dueDate: "26"
    },
    {
        bank: "Meritize",
        type: "Loan",
        accountOpened: "",
        loanAmount: 12000,
        balance: 11000.39,
        minimumPayment: 300,
        interest: 4.99,
        dueDate: "30"
    },
]

const AccountList = () => {
    // Variables
    const [accounts, setAccounts] = useState(accountList)
    const [checkingAccounts, setCheckingAccounts] = useState([]);
    const [savingsAccounts, setSavingsAccounts] = useState([])
    const [creditCardAccounts, setCreditCardAccounts] = useState([]);
    const [loanAccounts, setLoanAccounts] = useState([])
    const [view, setView] = useState("Account List")

    // Functions
    const handleGetCheckingAccounts =  () => {
        const accountsToPush = []
         accounts.forEach(account => {
            if(account.type === "Checking") {
                accountsToPush.push(account)
            }
        })
        setCheckingAccounts(accountsToPush)
    }
    const handleGetSavingsAccounts =  () => {
        const accountsToPush = []
         accounts.forEach(account => {
            if(account.type === "Savings") {
                accountsToPush.push(account)
            }
        })
        setSavingsAccounts(accountsToPush)
    }
    const handleGetCreditCardAccounts =  () => {
        const accountsToPush = []
         accounts.forEach(account => {
            if(account.type === "Credit Card") {
                accountsToPush.push(account)
            }
        })
        setCreditCardAccounts(accountsToPush)
    }

    const handleGetLoanAccounts =  () => {
        const accountsToPush = []
         accounts.forEach(account => {
            if(account.type === "Loan") {
                accountsToPush.push(account)
            }
        })
        setLoanAccounts(accountsToPush)
    }

    const handleChangeView = (view) => {
        setView(view)
    }

    useEffect(()=>{
        handleGetCheckingAccounts()
        handleGetSavingsAccounts()
        handleGetCreditCardAccounts()
        handleGetLoanAccounts()
    }, [])
    return <div className="sectionAccountList">
        <i className="fi fi-rr-add account" onClick={() => handleChangeView("Add")}></i>
        {
            view === "Account List"?
            <>
                {
                checkingAccounts.length > 0 &&
                <section className='sectionChecking account'>
                    <h1>Checking Accounts</h1>
                    <div className='categoriesContainer account'>
                        <div className='listContainer account bank'><h2>Bank</h2></div>
                        <div className='listContainer account accountNumber'><h2>Account Number</h2></div>
                        <div className='listContainer account accountBalance'><h2>Balance</h2></div>
                    </div>
                    <div className='accountContainer'>
                        {
                            checkingAccounts.map((account, index) => 
                                <Account 
                                    key = {index}
                                    account = {account}
                                />
                            )
                        }
                    </div>
                </section>
            }
            {
                savingsAccounts.length > 0 &&
                <section className='sectionSavings account'>
                    <h1>Savings Accounts</h1>
                    <div className='categoriesContainer account'>
                        <div className='listContainer account bank'><h2>Bank</h2></div>
                        <div className='listContainer account accountNumber'><h2>Account Number</h2></div>
                        <div className='listContainer account accountBalance'><h2>Balance</h2></div>
                    </div>
                    <div className='accountContainer'>
                        {
                            savingsAccounts.map((account, index) => 
                                <Account 
                                    key = {index}
                                    account = {account}
                                />
                            )
                        }
                    </div>
                </section>
            }
            {
                creditCardAccounts.length > 0 &&
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
                        creditCardAccounts.map((account, index) => 
                            <CreditCard 
                                key = {index}
                                account = {account}
                            />
                        )
                    }
                </section>
            }
            {
                loanAccounts.length > 0 &&
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
                        loanAccounts.map((account, index) => 
                            <Loan 
                                key = {index}
                                account = {account} 
                            />
                        )
                    }
                </section>
            }
            </>
            : view === "Add"?
            <AddAccount 
                back = {() => handleChangeView("Account List")}
            />
            : <></>
        }
        
    </div>
}

export default AccountList