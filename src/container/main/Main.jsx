import Bill from "../../Components/Bill";
import NavBar from "../../Components/NavBar";
import "./Main.css"

const Main = (props) => {

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
                props.bills.map((bill, index) =>
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