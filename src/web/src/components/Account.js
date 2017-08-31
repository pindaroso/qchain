import React, {Component} from 'react';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
    }

    toggleHover(){
        this.setState({hover: !this.state.hover});
    }

    render() {
        var styles = {
            display: 'none',
            textDecoration: 'none',
            color: this.state.hover?'#2FC2EF':'#14171a',
            title: {
                fontSize: 18,
                margin: 0,
                paddingTop: 4,
                textDecoration: this.state.hover?'underline':'none'
            },
            subtitle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#657786',
                margin: '6px 0'
            }
        };

        return (
                <a style={styles}
                   href="/"
                   onMouseEnter={()=>this.toggleHover()}
                   onMouseLeave={()=>this.toggleHover()}>
                    <h1 style={styles.title}>Brandon!</h1>
                    <h2 style={styles.subtitle}>Brandon Robert</h2>
                </a>
        );
    }
}
