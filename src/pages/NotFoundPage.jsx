import React from 'react'

const NotFoundPage = () => {
    return (
        <div className="jumbotron scores-body">
        <div style={{ width: "100%" , display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} className="row">
            {/* <FaThermometerEmpty size={90} color="black" /> */}
            <h1>404 Page Not Found</h1>
            <a className="green-link" href="/">Home page</a>
        </div>
        </div>
      )
}

export default NotFoundPage