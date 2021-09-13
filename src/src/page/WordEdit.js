import React from 'react';
import Header from '../component/Header'
import Roads from '../component/Roads'
import config from '../config/setting'
import Word from '../component/Word'
class WordEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Header subTitle='Word Edit' />
                </div>
                <div className="row">
                    <Roads
                        roads={config.common_road}
                    />
                </div>
                <div className="row">
                    <Word
                        id={this.state.id}
                    />
                </div>

            </div>
        );
    }
}

export default WordEdit
