import "./Main.css"

const Main = () => {
    return(
        <main className='mainContainer'>
            <div className='categoriesContainer'>
                <div className='listContainer'><li>Date</li></div>
                <div className='listContainer'><li>Amount</li></div>
                <div className='listContainer'><li>Type</li></div>
                <div className='listContainer'><li>Running Total</li></div>
                <div className='listContainer'><li>Target</li></div>
            </div>
        </main>
    )
}

export default Main;