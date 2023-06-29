import { useState } from "react";
import { useDispatch } from "react-redux";
import { billPaidToggle } from "../features/billSlice";

const BillPaidCheckBox = props => {
    const dispatch = useDispatch();
    const [paidStatus] = useState(props.bill.paid);

    return <>
        {!paidStatus 
            ? <i 
                className="fi fi-rr-checkbox iconCheckBox" 
                onClick={() => dispatch(billPaidToggle(props.bill))}
            />
            : <i 
                className="fi fi-rr-cross-circle iconCheckBox" 
                onClick={() => dispatch(billPaidToggle(props.bill))}
            />
        }
    </>
};

export default BillPaidCheckBox;