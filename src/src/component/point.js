import React from 'react'
import {Card,Row,Col} from "antd";
import {SaveOutlined,OrderedListOutlined} from '@ant-design/icons';
class Point extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pid:props.pid,
            id:props.id
        }
    }
    render(){
        return(
            <Card>
                <Row justify="space-around" align="middle">
                    <Col span={20}>
                        <input
                            style={{width:"90%",margin:"5px"}}
                        />
                    </Col>
                    <Col span={2}>
                        <SaveOutlined
                        />
                    </Col>
                    <Col span={2}>
                        <OrderedListOutlined
                        />
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default Point