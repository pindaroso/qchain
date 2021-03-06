import React, {
    Component
} from 'react';

import {
    default as async
} from 'async';

import {
    default as Web3
} from 'web3';

import {
    default as contract
} from 'truffle-contract';

import electionInterface from '../build/contracts/Election.json';

import {
    default as candidateList
} from '../candidates.json';

import Account from './components/Account';
import Poll from './components/Poll';
import Results from './components/Results';

let candidates = candidateList.names;

var Election = contract(electionInterface);

var provider = new Web3.providers.HttpProvider("http://localhost:8550");
var web3 = new Web3(provider);

Election.setProvider(web3.currentProvider);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names: [],
            results: []
        };
    }

    castVote(candidate) {
        var comp = this;
        Election.deployed().then(function(instance) {
            instance.castVote(candidate, {
                gas: 140000,
                from: web3.eth.accounts[0]
            }).then(function() {
                comp.refreshCounts();
            });
        });
    }

    refreshCounts() {
        var comp = this;
        Election.deployed().then(function(instance) {
            async.map(candidates, function(name, callback) {
                return instance.getVoteCount.call(name).then(function(count) {
                    return callback(null, {
                        name: name,
                        count: count.toNumber()
                    });
                });
            },
	    function(err, res) {
                if (res) comp.setState({
                    results: res,
                    names: res.map((candidate) => {
                        return candidate.name;
                    })
                });
            });
        });
    }

    render() {
        var styles = {
            wrapper: {
                background: '#fff',
                color: '#14171a',
                margin: '80px auto',
                padding: '30px 40px',
                borderRadius: 5,
                fontSize: 14,
                lineHeight: '18px',
                maxWidth: 560,
                boxShadow: 'box-shadow: rgba(109, 109, 109, 0.8) 1px 1px 1px'
            },
            question: {
                clear: 'both',
                fontSize: 27,
                lineHeight: '32px',
                fontWeight: 300,
                letterSpacing: '.01em',
                margin: '10px 0'
            }
        };
        return (
            <div style={styles.wrapper}>
                <Account/>
                <p style={styles.question}>
                    Who is your favorite computer programmer?
                </p>
                {
                    this.state.results.length ?
                        <Results results={this.state.results}
                                 refresh={() => { this.refreshCounts(); }}/> :
                        <Poll candidates={candidates}
                              vote={(candidate) => this.castVote(candidate)}/>
                }
            </div>
        );
    }
}

export default App;
