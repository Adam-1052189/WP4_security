 import React from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Domeinen from "../components/Domeinen"

function StudentDashboard() {
    return (
        <div>
            <Header />
                <div>
                    <p>hier komt te staan welkom naam gebruiker</p>
                    <p>hier staan de vakken</p>
                    <Domeinen />
                </div>

            <Footer />
        </div>
    )
}

export default StudentDashboard