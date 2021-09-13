import React from 'react'
import config from '../config/setting';
import {Form, Input, Button, Modal} from 'antd';
import {SaveOutlined, EditOutlined} from '@ant-design/icons'
import PhoneticSymbol from "./phoneticSymbol";
import {getSymbolSaveData, getSymbolString, saveSymbol} from "./symbol";

const marked = require("marked");

class Word extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: {},
            id: props.id,
            preId: 0,
            editNote: false,
            keyboardModel: false
        }
        this.getWordDetail = this.getWordDetail.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.updateMarkdownHtml = this.updateMarkdownHtml.bind(this);
    }

    getWordDetail(id, forceUpdate = false, defaultWord = '') {
        if (!forceUpdate) {
            if (id == 0 || id === undefined) {
                return false;
            }
        }
        fetch(config.back_domain + "/index.php?action=words&method=detail&id=" + id)
            .then(
                (res) => {
                    res.json().then((json) => {
                        if (json.Data.phonetic_transcription) {
                            saveSymbol(json.Data.phonetic_transcription);
                        }
                        return json;
                    }).then((json) => {
                        let word = json.Data;
                        this.setState({word: word, preId: id, id: id})
                    })
                        .then(() => {
                            this.updateMarkdownHtml();
                        }).then(() => {
                        if (this.state.word.phonetic_transcription) {
                            saveSymbol(this.state.word.phonetic_transcription)
                        }
                    })
                }
            ).catch((err) => {

        })
    }

    updateMarkdownHtml() {
        if (!this.state.editNote) {
            if (this.state.word.note && this.state.word.note.length) {
                document.getElementById(this.state.word.id + "_note").innerHTML = marked(this.state.word.note);
            } else {
                document.getElementById(this.state.word.id + "_note").innerHTML = marked("");
            }
        }
    }

    componentDidMount() {
        this.getWordDetail(this.state.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateMarkdownHtml();
    }

    handleValueChange(event, name) {
        let word = this.state.word;
        let value = event.target.value;
        switch (name) {
            case 'word':
                word.word = value;
                break;
            case "explain":
                word.explain = value;
                break;
            case "source":
                word.Source = value;
                break;
            case "related_word_1":
                word.related_word_1 = value;
                break;
            case "related_word_2":
                word.related_word_2 = value;
                break;
            case "related_word_3":
                word.related_word_3 = value;
                break;
            case "note":
                word.note = value;
                break;
        }
        this.setState({
            word: word
        });
    }

    saveWord() {
        let word = this.state.word;
        word.phonetic_transcription = getSymbolSaveData();
        fetch(config.back_domain + "/index.php?action=words&method=save&id=" + this.state.id, {
            method: "post",
            mode: "cors",
            body: JSON.stringify(word)
        }).then((res) => {
            res.json().then((json) => {
                let ID = json.Data.ID;
                this.setState({
                    id: ID
                })
                return ID;
            }).then((ID) => {
                this.getWordDetail(ID);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.id != this.state.preId) {
            this.getWordDetail(nextProps.id, true, nextProps.defaultWord);
        }
    }

    render() {
        var notePart = <div></div>;
        if (this.state.editNote) {
            notePart = <div>
                <textarea
                    className="markdown-textarea"
                    value={this.state.word.note}
                    onChange={(event) => this.handleValueChange(event, 'note')}
                />
            </div>;
        } else {
            notePart = <div className="markdown-preview">
                <div id={this.state.word.id + "_note"}></div>
            </div>;
        }
        return (
            <div className='container'>
                <div className="row">
                    <h3>ID:{this.state.word.ID}</h3>
                    <h3>AddTime:{this.state.word.AddTime}</h3>
                    <h3>LastUpdateTime:{this.state.word.LastUpdateTime}</h3>
                </div>
                <div className="row">
                    <Form
                        layout="vertical"
                    >
                        <Form.Item label="Word">
                            <Input
                                placeholder="Word"
                                value={this.state.word.word}
                                onChange={(e) => this.handleValueChange(e, 'word')}
                            />
                        </Form.Item>
                        <Form.Item label="Phonetic Symbol">
                            <Button
                                icon={<EditOutlined/>}
                                type="primary"
                                onClick={() => {
                                    this.setState({
                                        keyboardModel: true
                                    })
                                }}
                            >
                                {getSymbolString()}
                            </Button>
                        </Form.Item>
                        <Form.Item label="Explain">
                            <Input
                                placeholder="explain"
                                value={this.state.word.explain}
                                onChange={(e) => this.handleValueChange(e, 'explain')}
                            />
                        </Form.Item>
                        <Form.Item label="Note">
                            <div>
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
                            </div>
                            {notePart}
                        </Form.Item>
                        <Form.Item label="Source">
                            <Input
                                placeholder="Source"
                                value={this.state.word.Source}
                                onChange={(e) => this.handleValueChange(e, 'source')}
                            />
                        </Form.Item>
                        <Form.Item label="Related word">
                            <Input
                                placeholder="Word 1"
                                value={this.state.word.related_word_1}
                                onChange={(e) => this.handleValueChange(e, 'related_word_1')}
                            />
                            <hr/>
                            <Input
                                placeholder="Word 2"
                                value={this.state.word.related_word_2}
                                onChange={(e) => this.handleValueChange(e, 'related_word_2')}
                            />
                            <hr/>
                            <Input
                                placeholder="Word 3"
                                value={this.state.word.related_word_3}
                                onChange={(e) => this.handleValueChange(e, 'related_word_3')}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                icon={<SaveOutlined/>}
                                type="primary"
                                onClick={() => this.saveWord()}
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <Modal
                        title={"Phonetic Symbol"}
                        visible={this.state.keyboardModel}
                        footer={null}
                        onCancel={() => {
                            this.setState({
                                keyboardModel: false
                            });
                        }}
                    >
                        <PhoneticSymbol/>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Word
