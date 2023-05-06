import { useEffect, useState } from 'react'
import './AccountList.css'
import Account from './Account';
import CreditCard from './CreditCard';
import Loan from './Loan';
import AddAccount from '../add/AddAccount';
import ShowAccount from '../show/ShowAccount';
import EditAccount from '../edit/EditAccount';
import Categories from '../../common/Categories';

const AccountList = props => {
    // Variables
    const [accountCategory, setAccountCategory] = useState({
        checking: {
            list:[],
            show: true
        },
        savings:  {
            list:[],
            show: true
        },
        creditCard:  {
            list:[],
            show: true
        },
        loan:  {
            list:[],
            show: true
        },
    });

    const [openAcc, setOpenAcc] = useState({});
    const [view, setView] = useState("Account List");

    // View
    const handleChangeView = view => setView(view)
    
    const handleShowAcc = account => {
        setOpenAcc(account);
        setView("Show");
    }

    const handleShowCategory = e => {
        for (const [key, value] of Object.entries(accountCategory)) {
            if(key === e.target.classList[2]) {
                // console.log(accountCategory[key])
                setAccountCategory({...accountCategory, [key]: 
                    {
                        ...value,
                        show: !value.show
                    }
                });
            };
        };
    };

    // Number modifiers
    const addComma = numToString => {
        if (numToString > 999) {
            numToString = numToString.toFixed(2).toString();
            for (let i = numToString.length - 6; i >= 0; i -= 3  ) {
                numToString = numToString.slice(0,i) + ',' + numToString.slice(i);
                
            };
        };
        return numToString;
    }

    useEffect(()=>{
        // GET
        const handleAccountCategory = () => {
            const accsCheckings = [];
            const accsSavings = [];
            const accsCreditCard = [];
            const accsLoan = [];
            props.accounts.forEach(account => {
                switch(account.accType) {
                    case 'Checking': 
                        accsCheckings.push(account);
                        break;
                    case 'Savings':
                        accsSavings.push(account);
                        break;
                    case 'Credit Card':
                        accsCreditCard.push(account);
                        break;
                    case 'Loan':
                        accsLoan.push(account);
                        break;
                    default:
                        break;
                };
            });

            setAccountCategory({
                checking: {
                    list: accsCheckings,
                    show: true
                },
                savings:  {
                    list: accsSavings,
                    show: true
                },
                creditCard:  {
                    list: accsCreditCard.sort((a,b) => b.availableCredit - a.availableCredit),
                    show: true
                },
                loan:  {
                    list: accsLoan,
                    show: true
                }
            })
        };
        handleAccountCategory();
    }, [props.accounts]);

    return (
        <div className="sectionAccountList">
            {view === "Account List"
                ? <>
                    <div className='accountListHeader'>
                        <i 
                            className="fi fi-rr-add account" 
                            onClick={() => handleChangeView("Add")}
                        />
                        <div className='accountListCategories'>
                            <p 
                                className={`accountListHeader categories checking ${accountCategory.checking.show && 'selected'}`} 
                                onClick={handleShowCategory}
                            >Checking</p>

                            <p 
                                className={`accountListHeader categories savings ${accountCategory.savings.show && 'selected'}`} 
                                onClick={handleShowCategory}
                            >Savings</p>

                            <p 
                                className={`accountListHeader categories creditCard ${accountCategory.creditCard.show && 'selected'}`} 
                                onClick={handleShowCategory}
                            >Credit Card</p>

                            <p 
                                className={`accountListHeader categories loan ${accountCategory.loan.show && 'selected'}`} 
                                onClick={handleShowCategory}
                            >Loan</p>
                        </div>
                    </div>

                    {/* Checking Account */}
                    {(accountCategory.checking.list.length > 0 && accountCategory.checking.show) &&
                        <section className='sectionChecking account'>
                            <h1>Checking Accounts</h1>
                            <Categories 
                                mobileCategories = {["bank", "account number", "balance"]}
                            />
                            <div className='accountContainer'>
                                {accountCategory.checking.list.map((account, index) => 
                                    <Account 
                                        key = {index}
                                        account = {account}
                                        server = {props.server}
                                        update = {props.modifyAccounts.update}
                                        handleShowAcc = {() => handleShowAcc(account)}
                                    />
                                )}
                            </div>
                        </section>
                    }

                    {/* Savings Account */}
                    {(accountCategory.savings.list.length > 0 && accountCategory.savings.show) &&
                        <section className='sectionSavings account'>
                            <h1>Savings Accounts</h1>
                            <Categories 
                                mobileCategories = {["bank", "account number", "balance"]}
                            />
                            <div className='accountContainer'>
                                {accountCategory.savings.list.map((account, index) => 
                                    <Account 
                                        key = {index}
                                        account = {account}
                                        update = {props.modifyAccounts.update}
                                        handleShowAcc = {() => handleShowAcc(account)}
                                    />
                                )}
                            </div>
                        </section>
                    }

                    {/* Credit Card */}
                    {(accountCategory.creditCard.list.length > 0 && accountCategory.creditCard.show) &&
                        <section className='sectionCredit account'>
                            <h1>Credit Card Accounts</h1>
                            <Categories 
                                mobileCategories = {[
                                    "bank", 
                                    "available credit",
                                    "minimum payment",
                                    "usage"
                                ]}
                                fullCategories = {[
                                    "account number", 
                                    "balance", 
                                    "due date", 
                                    "interest"
                                ]}
                            />
                            {accountCategory.creditCard.list.map((account, index) => 
                                <CreditCard 
                                    key = {index}
                                    account = {account}
                                    addComma = {addComma}
                                    handleShowAcc = {() => handleShowAcc(account)}
                                />
                            )}
                        </section>
                    }

                    {/* Loan */}
                    {(accountCategory.loan.list.length > 0 && accountCategory.loan.show) &&
                        <section className='sectionLoan account'>
                            <h1>Loans</h1>
                            <Categories 
                                mobileCategories = {[
                                    "bank",
                                    "minimum payment",
                                    "due date",
                                    "paid"
                                ]}
                                fullCategories = {["balance",, "loan amount", "interest"]}
                            />
                            {accountCategory.loan.list.map((account, index) => 
                                <Loan 
                                    key = {index}
                                    account = {account} 
                                    addComma = {addComma}
                                    handleShowAcc = {() => handleShowAcc(account)}
                                />
                            )}
                        </section>
                    }
                </>
            : view === "Add"
                ? <AddAccount 
                        server = {props.server}
                        add = {props.modifyAccounts.add}
                        return = {() => handleChangeView("Account List")}
                    />
            : view === "Show"
                ? <ShowAccount 
                        openAcc = {openAcc}
                        server = {props.server}
                        addComma = {addComma}
                        delete = {props.modifyAccounts.delete}
                        return = {() => handleChangeView("Account List")}
                        edit = {() => handleChangeView("Edit")}
                    />
            : view === "Edit"
                ? <EditAccount 
                        openAcc = {openAcc}
                        server = {props.server}
                        addComma = {addComma}
                        update = {props.modifyAccounts.update}
                        return = {() => handleChangeView("Account List")}
                    />
            : <></>
            }
        </div>
    );
};

export default AccountList;