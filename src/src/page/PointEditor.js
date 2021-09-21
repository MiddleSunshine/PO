import React from "react";
import PointEdit from "../component/PointEdit";


class PointEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ID:0
        }
    }
    render() {
        return (
            <div>
                <PointEdit
                    ID={this.state.ID}
                />
            </div>
        );
    }

}

export default PointEditor