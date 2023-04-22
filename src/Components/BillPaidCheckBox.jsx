import { useState } from "react";

const BillPaidCheckBox = (props) => {
    const [paidStatus, setPaidStatus] = useState(props.paid)

    const handleChangePaidStatus = () => {
        setPaidStatus(!paidStatus)
    }
    return <>{
        !paidStatus ?
        <i class="fi fi-rr-checkbox iconCheckBox" onClick={handleChangePaidStatus}></i>
        :
        <i class="fi fi-rr-cross-circle iconCheckBox" onClick={handleChangePaidStatus}></i>
    }</>
}

export default BillPaidCheckBox;