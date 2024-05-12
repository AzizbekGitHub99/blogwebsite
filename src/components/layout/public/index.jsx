import { Fragment } from "react"
import Header from "../../header"
import { Outlet } from "react-router-dom"
import Footer from "../../footer"


const PublicLayout = () => {
  return (
    <Fragment>
        <Header/>
            <main>
            <Outlet />  
            </main>
        <Footer />
    </Fragment>
  )
}

export default PublicLayout