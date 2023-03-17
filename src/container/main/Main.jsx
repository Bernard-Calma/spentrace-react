import { useEffect } from "react";
import Bill from "../../Components/Bill";
import Categories from "./Categories";
import "./main.css"

const Main = (props) => {
    return(
        <main className='mainContainer'>
            <Categories />
            <div className="billsContainer">
                {
                    props.bills.map((bill, index) =>
                        <Bill 
                            key={index}
                            index={index}
                            bill={bill}
                            totalIncome = {props.totalIncome}
                            totalExpense = {props.totalExpense}
                            handleChangeView = {props.handleChangeView}
                            handleShowBill = {props.handleShowBill}
                        />
                    )
                }
            </div>
        </main>
    )
}

export default Main;