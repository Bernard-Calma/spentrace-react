import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAccounts, setOpenAcc } from '../../features/accountSlice';
import { changeView, toggleAccountsCategory } from '../../features/viewSlice';

import Account from './Account';
import CreditCard from './CreditCard';
import Loan from './Loan';
import AddAccount from '../add/AddAccount';
import ShowAccount from '../show/ShowAccount';
import EditAccount from '../edit/EditAccount';
import Categories from '../../common/Categories';

import './AccountList.css'

const AccountList = props => {
    const dispatch = useDispatch();
    const {
        accList,
    } = useSelector(store => store.account)
    const {
        accountView,
    } = useSelector(store => store.view)

    const handleShowAcc = account => {
        dispatch(setOpenAcc(account));
        dispatch(changeView({
            accountView: {view: "Show"}
        }))
    }

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
                                accountView: {view: "Add"}
                            }))}
                        />
                        <div className='accountListCategories'>
                            <p 
                                className={`accountListHeader categories checking ${accountView.checkingView && 'selected'}`} 
                                onClick={() => dispatch(toggleAccountsCategory("checkingView"))}
                            >Checking</p>

                            <p 
                                className={`accountListHeader categories savings ${accountView.savingsView && 'selected'}`} 
                                onClick={() => dispatch(toggleAccountsCategory("savingsView"))}
                            >Savings</p>

                            <p 
                                className={`accountListHeader categories creditCard ${accountView.creditCardsView && 'selected'}`} 
                                onClick={() => dispatch(toggleAccountsCategory("creditCardsView"))}
                            >Credit Card</p>

                            <p 
                                className={`accountListHeader categories loan ${accountView.loansView && 'selected'}`} 
                                onClick={() => dispatch(toggleAccountsCategory("loansView"))}
                            >Loan</p>
                        </div>
                    </div>

                    {/* Checking Account */}
                    {(accList.checking.length > 0 && accountView.checkingView) &&
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
                    {(accList.savings.length > 0 && accountView.savingsView) &&
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
                    {(accList.creditCard.length > 0 && accountView.creditCardsView) &&
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
                    {(accList.loan.length > 0 && accountView.loansView) &&
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
            : accountView.view === "Add" ? <AddAccount/>
            : accountView.view === "Show" ? <ShowAccount addComma = {addComma}/>
            : accountView.view === "Edit" ? <EditAccount addComma = {addComma}/>
            : <></>
            }
        </div>
    );
};

export default AccountList;