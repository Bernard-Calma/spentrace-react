import { useEffect, useState } from "react";
import Bill from "../../Components/Bill";
import NavBar from "../../Components/NavBar";
import "./Main.css"

const Main = (props) => {

    const [bills, setBills] = useState([])
    const getBills = () => {
        fetch("http://localhost:8000/plans")
        .then((res) => res.json())
        .then((data) => setBills(data))
    }

    const modifyDate = () => {
        // console.log(bills.map(bill => bill))
    }

    useEffect(()=>{
        getBills();
        modifyDate(); 
    }, [])
    return(
        <main className='mainContainer'>
            <NavBar 
                setView = {props.setView}
            />
            <div className='categoriesContainer'>
                <div className='listContainer'><h2>Date</h2></div>
                <div className='listContainer'><h2>Amount</h2></div>
                <div className='listContainer'><h2>Type</h2></div>
                <div className='listContainer'><h2>Running Total</h2></div>
                <div className='listContainer'><h2>Target</h2></div>
            </div>
            {
                bills.map((bill, index) =>
                    <Bill 
                        key={index}
                        index={index}
                        bill={bill}
                    />
                )
            }
        </main>
    )
}

export default Main;