import { useEffect, useState } from 'react'
import './AccountList.css'
import CheckingAccount from './CheckingAccount';

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
        <section className='sectionChecking'>
            <h1>Checking Accounts</h1>
            <div className='categoriesContainer checking'>
                <div className='listContainer checking bank'><h2>Bank</h2></div>
                <div className='listContainer checking accountNumber'><h2>Account Number</h2></div>
                <div className='listContainer checking accountBalance'><h2>Balance</h2></div>
            </div>
            <div className='checkingContainer'>
                {
                    checkingAccounts.map((account, index) => 
                        <CheckingAccount 
                            key = {index}
                            account = {account}
                        />
                    )
                }
            </div>
        </section>
        <section className='sectionSavings'>
            <h1>Savings Accounts</h1>
            <div className='categoriesContainer checking'>
                <div className='listContainer checking bank'><h2>Bank</h2></div>
                <div className='listContainer checking accountNumber'><h2>Account Number</h2></div>
                <div className='listContainer checking accountBalance'><h2>Balance</h2></div>
            </div>
            <div className='checkingContainer'>
                {
                    savingsAccounts.map((account, index) => 
                        <CheckingAccount 
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