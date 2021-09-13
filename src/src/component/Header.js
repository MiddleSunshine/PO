import React from "react"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subTitle: props.subTitle
        }
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <h1>ER / {this.state.subTitle}</h1>
                </div>
            </nav>
        )
    }
}

export default Header
