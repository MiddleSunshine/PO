import React from 'react';
import Word from "./Word";
import config from "../config/setting";

class WordModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: props.word,
            id: 0,
            preWord: ''
        }
        this.getWordId = this.getWordId.bind(this);
    }

    getWordId(word) {
        fetch(
            config.back_domain + "/index.php?action=Words&method=GetID",
            {
                method: "post",
                mode: "cors",
                body: JSON.stringify({
                    word: word
                })
            }
        ).then((res) => {
            res.json().then(
                (json) => {
                    this.setState({
                        id: json.Data.ID,
                        preWord: word
                    })
                }
            ).catch((error) => {
                console.error(error)
            });
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.word != this.state.preWord) {
            this.getWordId(nextProps.word);
        }
    }

    componentDidMount() {
        this.getWordId(this.props.word);
    }

    render() {
        return <Word id={this.state.id} defaultWord={this.props.word}/>;
    }
}

export default WordModel;