import { useState } from "react";
import "./Categories.css"

const Categories = (props) => {
    const [mobileCategories] = useState(props.mobileCategories)
    const [fullCategories] = useState(props.fullCategories)
    return (
        <section className='categoriesContainer'>
                {mobileCategories?.map((category, index) => 
                    <h2 key={index} className={`category mobile ${category}`}>
                        {category}
                    </h2>
                )}
                {fullCategories?.map((category, index) => 
                    <h2
                        key={index}
                        className={`category full ${category}`}
                    >
                        {category}
                    </h2>
                )}
                {/* <h2 className="category date">Date</h2>
                <h2 className="category name">Name</h2>
                <h2 className="category amount">Amount</h2>
                <h2 className="category type">Type</h2>
                <h2 className="category runningTotal">Running Total</h2> */}
        </section>
    );
};

export default Categories;