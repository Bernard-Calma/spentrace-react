import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAccounts } from '../../features/accountSlice';

import Account from './Account';
import CreditCard from './CreditCard';
import Loan from './Loan';
import AddAccount from '../add/AddAccount';
import ShowAccount from '../show/ShowAccount';
import EditAccount from '../edit/EditAccount';
import Categories from '../../common/Categories';

import './AccountList.css'
import { changeView } from '../../features/viewSlice';

const AccountList = props => {
    const dispatch = useDispatch();
    const {
        accList
    } = useSelector(store => store.account)
    const {
        accountView
    } = useSelector(store => store.view)
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

    useEffect(() => {
        dispatch(getAccounts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="sectionAccountList">
            {accountView.view === "Account List"
                ? <>
                    <div className='accountListHeader'>
                        <i 
                            className="fi fi-rr-add account" 
                            onClick={() => dispatch(changeView({
                                accountView: {
                                    view: "Add"
                            }}))}
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
                    {(accList.checking.length > 0 && accountCategory.checking.show) &&
                        <section className='sectionChecking account'>
                            <h1>Checking Accounts</h1>
                            <Categories 
                                mobileCategories = {["bank", "account number", "balance"]}
                            />
                            <div className='accountContainer'>
                                {accList.checking.map((account, index) => 
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
                    {(accList.savings.length > 0 && accountCategory.savings.show) &&
                        <section className='sectionSavings account'>
                            <h1>Savings Accounts</h1>
                            <Categories 
                                mobileCategories = {["bank", "account number", "balance"]}
                            />
                            <div className='accountContainer'>
                                {accList.savings.map((account, index) => 
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
                    {(accList.creditCard.length > 0 && accountCategory.creditCard.show) &&
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
                            {accList.creditCard.map((account, index) => 
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
                    {(accList.loan.length > 0 && accountCategory.loan.show) &&
                        <section className='sectionLoan account'>
                            <h1>Loans</h1>
                            <Categories 
                                mobileCategories = {[
                                    "bank",
                                    "minimum payment",
                                    "due date",
                                    "paid"
                                ]}
                                fullCategories = {["balance", "loan amount", "interest"]}
                            />
                            {accList.loan.map((account, index) => 
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
            : accountView.view === "Add"
                ? <AddAccount 
                        server = {props.server}
                        add = {props.modifyAccounts.add}
                        return = {() => handleChangeView("Account List")}
                    />
            : accountView.view === "Show"
                ? <ShowAccount 
                        openAcc = {openAcc}
                        server = {props.server}
                        addComma = {addComma}
                        delete = {props.modifyAccounts.delete}
                        return = {() => handleChangeView("Account List")}
                        edit = {() => handleChangeView("Edit")}
                    />
            : accountView.view === "Edit"
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