import React from "react";
import {Form, Input, Select, Button} from "antd";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import config from "../config/setting";
const {Option}=Select;

// markdown 插件仓库位置
// https://github.com/RIP21/react-simplemde-editor

class PointEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ID:props.ID,
            point:{},
            fileContent:""
        }
        this.getPointDetail=this.getPointDetail.bind(this);
    }
    getPointDetail(ID){

    }
    render() {
        return(
            <div className="container">
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label={"Info"}
                    >
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        label={"Keyword"}
                    >
                        <Input

                        />
                    </Form.Item>
                    <Form.Item
                        label={"Note"}
                    >
                        <Input

                        />
                    </Form.Item>
                    <Form.Item
                        label={"Point"}
                    >
                        <Input

                        />
                    </Form.Item>
                    <Form.Item
                        label={"File"}
                    >
                        <Input

                        />
                    </Form.Item>
                    <Form.Item
                        label={"Url"}
                    >
                        <Input

                        />
                    </Form.Item>
                    <Form.Item
                        label={"Status"}
                    >
                        <Select>
                            {config.statusMap.map((Item)=>{
                                return(
                                    <Option value={Item.value}>{Item.label}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"Deleted"}
                    >
                        <Select>
                            <Option value={0}>Active</Option>
                            <Option value={1}>Deleted</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"File Content"}
                    >
                        <SimpleMDE

                        />
                    </Form.Item>
                    <Form.Item
                        label={"Option"}
                    >
                        <Button
                            type={"primary"}
                        >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default PointEdit