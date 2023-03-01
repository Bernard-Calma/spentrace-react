import Footer from "../container/footer/Footer";
import Header from "../container/header/Header";
import "./NavBar.css"

const MinimizeNav = (props) => {
    return(
        <section className="containerMinimizeNav">
        <div className="minimizeHeader">
            <h1 onClick={props.handleShowNav} className="title">S</h1>
        </div>
        <div className="navBar">
        {
            props.view === "Main" ? <img className="navBarItem navIcon" onClick={()=> props.handleChangeView("Add")} src="https://www.flaticon.com/svg/vstatic/svg/9243/9243903.svg?token=exp=1677635808~hmac=64dc26a1ea060cb9c641892211927cfc" alt="add"/>
            : <>
                {
                    props.view === "Add" ? <></>
                    : <>
                        <img src="https://cdn-icons-png.flaticon.com/512/3597/3597104.png" alt="eidt" className="navBarItem navIcon"/>
                        <img src="https://cdn-icons-png.flaticon.com/512/1214/1214594.png" alt="delete" className="navBarItem navIcon"/>
                    </>
                }
            </>

        }
        </div>
        <img src="https://cdn-icons-png.flaticon.com/512/126/126467.png" alt="logout" className="minimizeBtnLogout"/>
        <div className="minimizeFooter">
            <h1>By <a href="http://bernardcalma.com" target="_blank" rel="noreferrer noopener" id="portfolioLink">BC</a></h1>
        </div>
    </section>
    )
}

export default MinimizeNav;