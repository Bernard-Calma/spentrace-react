import React ,{Component} from 'react';
import "./Main.css"

class  Main extends Component {
    render(){
        return(
            <main className='mainContainer'>
                <div className='categoriesContainer'>
                    <li>Date</li>
                    <li>Amount</li>
                    <li>Income/Expense</li>
                    <li>Running Total</li>
                    <li>Target</li>
                </div>
            </main>
        )
    }
}

export default Main;