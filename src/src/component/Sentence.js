import React from 'react';
import config from "../config/setting";
import {Form, Input, Button, Row, Col, Modal} from 'antd';
import {SaveOutlined, EditOutlined, FormOutlined, DeleteOutlined} from '@ant-design/icons'
import WordModel from "./WordModel";

const marked = require("marked");

class Sentence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            sentenceData: {},
            editNote: false,
            wordsList: [],
            wordsCount: 0,
            visible: false,
            afterSaveUrl: props.afterSaveUrl
        }
        this.getSentenceDetail = this.getSentenceDetail.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.updateMarkdownHtml = this.updateMarkdownHtml.bind(this);
        this.saveSentence = this.saveSentence.bind(this);
    }

    getSentenceDetail(id) {
        if (id == 0 || id == undefined) {
            return false;
        }
        fetch(
            config.back_domain + "/index.php?action=sentence&method=detail&id=" + id
        ).then((res) => {
            res.json().then((json) => {
                this.setState({
                    sentenceData: json.Data,
                    id: id
                })
            }).then(() => {
                this.updateMarkdownHtml();
            })
        }).catch((error) => {
            console.error(error);
        })
    }

    componentDidMount() {
        this.getSentenceDetail(this.state.id);
    }

    handleValueChange(event, type) {
        let sentence = this.state.sentenceData;
        let value = event.target.value;
        switch (type) {
            case 'note':
                sentence.note = value;
                break;
            case 'sentence':
                sentence.sentence = value;
                break;
            case 'source':
                sentence.source = value;
                break;
        }
        this.setState({
            sentenceData: sentence
        });
    }

    updateMarkdownHtml() {
        if (!this.state.editNote) {
            if (this.state.sentenceData.note && this.state.sentenceData.note.length) {
                let documentElement = document.getElementById("sentence_note");
                if (documentElement) {
                    documentElement.innerHTML = marked(this.state.sentenceData.note);
                }
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateMarkdownHtml();
    }

    saveSentence() {
        console.log(this.state.sentenceData);
        fetch(config.back_domain + "/index.php?action=sentence&method=save&id=" + this.state.id, {
            method: "post",
            body: JSON.stringify(this.state.sentenceData)
        }).then((res) => {
            res.json().then((json) => {
                this.getSentenceDetail(json.Data.ID);
                return json.Data.ID;
            }).then((ID) => {
                if (this.state.afterSaveUrl) {
                    window.location.href = this.state.afterSaveUrl + ID;
                }
            })
        }).catch((error) => {
            console.error(error);
        })
    }

    render() {
        // note 部分管理
        var notePart = <div></div>;
        if (this.state.editNote) {
            notePart = <div>
                <textarea
                    className="markdown-textarea"
                    value={this.state.sentenceData.note}
                    onChange={(event) => this.handleValueChange(event, 'note')}
                />
            </div>;
        } else {
            notePart = <div className="markdown-preview">
                <div id={"sentence_note"}></div>
            </div>;
        }
        return (
            <div className="container">
                <div className="row">
                    <h3>ID:{this.state.sentenceData.ID}</h3>
                    <h3>AddTime:{this.state.sentenceData.AddTime}</h3>
                    <h3>LastUpdateTime:{this.state.sentenceData.LastUpdateTime}</h3>
                </div>
                <div className="row">
                    <Form
                        layout="vertical"
                    >
                        <Form.Item label="Sentence">
                            <Input
                                placeholder="Sentence"
                                value={this.state.sentenceData.sentence}
                                onChange={(e) => this.handleValueChange(e, 'sentence')}
                            />
                        </Form.Item>
                        <Form.Item label="Source">
                            <Input
                                placeholder="Source"
                                value={this.state.sentenceData.source}
                                onChange={(e) => this.handleValueChange(e, 'source')}
                            />
                        </Form.Item>
                        <Form.Item label="Note">
                            <Button
                                icon={<EditOutlined/>}
                                type="primary"
                                onClick={() => {
                                    this.setState({
                                        editNote: !this.state.editNote
                                    })
                                }}
                            >
                                {this.state.editNote ? 'Finish' : 'Edit'}
                            </Button>
                            {notePart}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                icon={<SaveOutlined/>}
                                type="primary"
                                onClick={() => this.saveSentence()}
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Sentence;