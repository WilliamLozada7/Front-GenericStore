import React from "react";
import './footer.css'

export const Footer = () => {
    return(
        <React.Fragment>
            <footer id="footerBlue" className="bg-light text-center text-lg-start">
                <div className="text-center p-3" style={{ backgroundColor: "#e3f2fd"}}>
                   {new Date().getFullYear()} © Copyright
                </div>
            </footer>
        </React.Fragment>
    )
}