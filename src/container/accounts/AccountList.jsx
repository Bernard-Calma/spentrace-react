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

const AccountList = (props) => {
    // Variables
    const [accounts, setAccounts] = useState(props.accounts)
    const [accountCategory, setAccountCategory] = useState({
        checking: [],
        savings: [],
        creditCard: [],
        loan: []
    })
    const [view, setView] = useState("Account List")

    // Functions
    // ADD
    const handleAddAccount = (newAccount) => {
        setAccounts([...accounts, newAccount])
    }
    // GET
    const handleAccountCategory = () => {
        const accsCheckings = []
        const accsSavings = []
        const accsCreditCard = []
        const accsLoan = []
        accounts.forEach(account => {
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

    const handleChangeView = (view) => {
        setView(view)
    }

    // Number modifiers
    const addComma = (numToString) => {
        numToString = numToString.toFixed(2).toString()
        for (let i = numToString.length - 6; i >= 0; i -= 3  ) {
            numToString = numToString.slice(0,i) + ',' + numToString.slice(i)
            
        }
        return numToString
    }

    useEffect(()=>{
        handleAccountCategory()
    }, [accounts])
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
                            />
                        )
                    }
                </section>
            }
            </>
            : view === "Add"?
            <AddAccount 
                server = {props.server}
                handleAddAccount = {handleAddAccount}
                back = {() => handleChangeView("Account List")}
            />
            : <></>
        }
        
    </div>
}

export default AccountList