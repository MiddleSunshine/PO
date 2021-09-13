import React from 'react'
import {Breadcrumb} from 'antd'

class Roads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.roads
        }
    }

    render() {
        const roads = this.state.data.map((value, index) =>
            <Breadcrumb.Item key={index}>
                <a href={value.path}>
                    {value.name}
                </a>
            </Breadcrumb.Item>
        )
        return (
            <Breadcrumb>
                {roads}
            </Breadcrumb>
        )
    }
}

export default Roads
