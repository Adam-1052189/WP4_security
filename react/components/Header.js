import React from "react"
import "./CSS/header_stylesheet"
import "./Images/Glitch_logo.png"

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
            </nav>
        </header>

    )
}

export default Header