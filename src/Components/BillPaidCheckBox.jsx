import axios from "axios";
import { useState } from "react";

const BillPaidCheckBox = (props) => {
    const [paidStatus] = useState(props.bill.paid)

    const handleChangePaidStatus = () => {
        axios({
            method: "PATCH",
            url: `${props.server}/bills/${props.bill._id}`,
            data: {
                paidIndex: props.bill.dueDateIndex
            },
            withCredentials: true
        })
        .then(res => {
            props.updateBill(res.data)
        })
        .catch(err => console.log(err))
    }
    return <>{
        !paidStatus ?
        <i className="fi fi-rr-checkbox iconCheckBox" onClick={handleChangePaidStatus}></i>
        :
        <i className="fi fi-rr-cross-circle iconCheckBox" onClick={handleChangePaidStatus}></i>
    }</>
}

export default BillPaidCheckBox;