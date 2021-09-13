import {Table, Alert, Button} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
import React from 'react'
import config from '../config/setting';
import Header from '../component/Header'
import Roads from '../component/Roads'

class WordsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'ID',
                    key: 'ID'
                },
                {
                    title: 'Word',
                    dataIndex: 'word',
                    key: 'word'
                },
                {
                    title: 'Explain',
                    dataIndex: 'explain',
                    key: 'explain'
                },
                {
                    title: 'AddTime',
                    dataIndex: 'AddTime',
                    key: 'AddTime'
                },
                {
                    title: 'Option',
                    dataIndex: 'ID',
                    key: 'key',
                    render: (text, record) => {
                        let url = "/words/edit/" + record.ID
                        return (
                            <div>
                                <div>
                                    <a href={url} target="_blank">Edit</a>
                                </div>
                            </div>
                        )
                    }
                }
            ]
        }
        this.getWordsList = this.getWordsList.bind(this);
    }

    componentDidMount() {
        this.getWordsList();
    }

    getWordsList() {
        fetch(config.back_domain + "/index.php?action=words&method=list")
            .then(
                (res) => {
                    res.json().then((json) => {
                        this.setState({
                            data: json.Data
                        })
                    });
                }
            ).catch((err) => {
            // Alert();
            console.error(err);
        })
    }

    render() {
        const roads = config.common_road;
        return (
            <div className="container">
                <div className="row">
                    <Header subTitle="Word List"/>
                </div>
                <div className="row">
                    <Roads
                        roads={roads}
                    />
                </div>
                <div className="row">
                    <Button
                        icon={<PlusCircleOutlined/>}
                        type="primary"
                        onClick={() => {
                            window.location = "/words/create/0"
                        }}
                    >
                        Create New Word
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

export default WordsList;
