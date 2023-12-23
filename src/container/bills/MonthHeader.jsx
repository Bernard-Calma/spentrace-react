import { useDispatch, useSelector } from "react-redux";
import { handleNextMonth, handlePreviousMonth } from "../../features/billSlice";

const MonthHeader = () => {
    const dispatch = useDispatch();
    const {monthText, year} = useSelector( store => store.bill)
    return <div className='billsListHeader'>
        <i 
            className="fi fi-rr-arrow-small-left btnPrevious" 
            onClick={() => dispatch(handlePreviousMonth())}
        />
        <h1 className='month'>{monthText + " " + year}</h1>
        <i 
            className="fi fi-rr-arrow-small-right btnNext" 
            onClick={() => dispatch(handleNextMonth())}
        />
    </div>
};

export default MonthHeader;;