import { useEffect, useState } from 'react'
import './AccountList.css'
import Account from './Account';

const accountList = [
    {
        bank: "Bank of America",
        accountNumber: 123456,
        balance: -256.23,
        type: "Checking",
        interestRate: 0,
        dueDate: "na",
        minimumPayment: 0,
        availableCredit: 0,
    },
    {
        bank: "Capital One",
        accountNumber: 1234567,
        balance: 200,
        type: "Checking",
        interestRate: 0,
        dueDate: "na",
        minimumPayment: 0,
        availableCredit: 0,
    },
    {
        bank: "Bank of America",
        accountNumber: 1354,
        balance: 50,
        type: "Savings",
        interestRate: 0,
        dueDate: "na",
        minimumPayment: 0,
        availableCredit: 0,
    },
    {
        bank: "Capital One",
        accountNumber: 681,
        balance: 100,
        type: "Savings",
        interestRate: 0,
        dueDate: "na",
        minimumPayment: 0,
        availableCredit: 0,
    },
]

const AccountList = () => {
    // Variables
    const [accounts, setAccounts] = useState(accountList)
    const [checkingAccounts, setCheckingAccounts] = useState([]);
    const [savingsAccounts, setSavingsAccounts] = useState([])

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

    useEffect(()=>{
        handleGetCheckingAccounts()
        handleGetSavingsAccounts()
    }, [])
    return <div className="sectionAccountList">
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
        <section className='sectionCredit'>

        </section>
        <section className='sectionLoan'>

        </section>
    </div>
}

export default AccountList