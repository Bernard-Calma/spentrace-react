const Categories = () => {
    return (
        <div className='categoriesContainer'>
                <div className='listContainer date'><h2>Date</h2></div>
                <div className='listContainer name'><h2>Name</h2></div>
                <div className='listContainer'><h2 className="amount">Amount</h2></div>
                <div className='listContainer type'><h2>Type</h2></div>
                <div className='listContainer'><h2>Running Total</h2></div>
                {/* <div className='listContainer'><h2>Target</h2></div> */}
        </div>
    )
}

export default Categories