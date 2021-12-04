import React from "react";
import { Header } from "../header/header";
import { Footer } from "../footer/Footer";
import { NavMenu } from "../navmenu/NavMenu";

export const Main = () => {

    return(
        <div>
            <Header/>
            <NavMenu/>
            <Footer/>
        </div>
    )
}

