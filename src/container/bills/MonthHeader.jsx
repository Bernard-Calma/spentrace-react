const MonthHeader = (props) => {
    return  <div className='billsListHeader'>
                <i className="fi fi-rr-arrow-small-left btnPrevious" onClick={props.handlePrevMonth}></i>
                <h1 className='month'>{props.monthText}</h1>
                <i className="fi fi-rr-arrow-small-right btnNext" onClick={props.handleNextMonth}></i>
            </div>
}

export default MonthHeader;