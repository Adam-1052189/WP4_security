import React from "react"
import "./CSS/header_stylesheet"
import {View, Text, Image} from "react-native"
const logoImg = require("./Images/Glitch_logo.png")

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/meldingen">meldingen</a></li>
                    <li><a href="/profiel">profiel</a></li>
                </ul>
                <Image source={logoImg}/>
            </nav>
        </header>

    )
}

export default Header