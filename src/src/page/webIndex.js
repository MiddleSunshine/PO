import React from 'react';
import WordsCharts from "../component/charts/Words";


class webIndex extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="container-fluid">
                        <div className="row">
                            <nav class="navbar navbar-inverse"></nav>
                        </div>
                        <div className="row">
                            <h1>web版</h1>
                            {/* 这里放图表或者是单词列表 */}
                            <ul class="nav nav-sidebar">
                                <li><a href="/sentence/list">Sentence List</a></li>
                                <li><a href="/words/list">Words List</a></li>
                                <li><a href="/check/list">Check Words List</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <WordsCharts />
                </div>
            </div>

        );
    }
}

export default webIndex;
