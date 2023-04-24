import { useEffect, useState } from 'react'
import './AccountList.css'
import Account from './Account';
import CreditCard from './CreditCard';

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
]

const AccountList = () => {
    // Variables
    const [accounts, setAccounts] = useState(accountList)
    const [checkingAccounts, setCheckingAccounts] = useState([]);
    const [savingsAccounts, setSavingsAccounts] = useState([])
    const [creditCardAccounts, setCreditCardAccounts] = useState([]);
    const [loanAccounts, setLoanAccounts] = useState([])

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

    useEffect(()=>{
        handleGetCheckingAccounts()
        handleGetSavingsAccounts()
        handleGetCreditCardAccounts()
    }, [])
    return <div className="sectionAccountList">
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
            <section className='sectionLoan'>

            </section>
        }
    </div>
}

export default AccountList