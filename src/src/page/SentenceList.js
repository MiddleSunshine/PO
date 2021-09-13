import {Table, Button} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
import React from 'react'
import config from '../config/setting';
import Header from '../component/Header'
import Roads from '../component/Roads'

class SentenceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'ID',
                    key: 'ID'
                },
                {
                    title: 'Sentence',
                    dataIndex: 'sentence',
                    key: 'ID'
                },
                {
                    title: 'Option',
                    dataIndex: 'ID',
                    key: 'ID',
                    render: (text, record) => {
                        let url = "/sentence/edit/" + record.ID;
                        return (
                            <div>
                                <div>
                                    <a href={url} target={"_blank"}>Edit</a>
                                </div>
                            </div>
                        )
                    }
                }
            ],
            data: []
        }
        this.getSentenceList = this.getSentenceList.bind(this);
    }

    getSentenceList() {
        fetch(
            config.back_domain + "/index.php?action=Sentence&method=list"
        ).then((res) => {
            res.json().then((json) => {
                this.setState({
                    data: json.Data
                })
            })
        })
    }

    componentDidMount() {
        this.getSentenceList();
    }

    render() {
        return (
            <div className="container">
                <diw className="row">
                    <Header subTitle="Sentence List"/>
                </diw>
                <div className="row">
                    <Roads
                        roads={config.common_road}
                    />
                </div>
                <div className="row">
                    <Button
                        icon={<PlusCircleOutlined/>}
                        type="primary"
                        onClick={() => {
                            window.location = "/sentence/create/0"
                        }}
                    >
                        Create New Sentence
                    </Button>
                </div>
                <div className="row">
                    <Table
                        dataSource={this.state.data}
                        columns={this.state.columns}
                    />
                </div>
            </div>
        );
    }
}

export default SentenceList;
