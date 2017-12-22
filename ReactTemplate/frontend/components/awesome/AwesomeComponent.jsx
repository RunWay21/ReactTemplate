import React from 'react';
import './AwesomeComponent.scss';
export default class AwesomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { likesCount: 0 };
    }

    onLike(value) {
        let newLikesCount = this.state.likesCount + value;
        this.setState({ likesCount: newLikesCount });
    }

    render() {
        return (
            <div className="awesomeComponent">
                Likes : <span>{this.state.likesCount}</span>
                <div><button onClick={() => this.onLike(1)}>Like Me</button></div>
                <div><button onClick={() => this.onLike(-1)}>Dislike</button></div>
            </div>
        );
    }

}