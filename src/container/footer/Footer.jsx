const Footer = () => {
    return(
        <footer>
            <h1 className="footer-content">©
                <a 
                    href="http://bernardcalma.com" 
                    target="_blank" 
                    rel="noreferrer noopener" 
                    id="protfolioLink"
                > Spentrace {new Date().getFullYear()}</a>
            </h1>
        </footer>
    )
}

export default Footer;