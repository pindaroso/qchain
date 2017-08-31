require('babel-register');

module.exports = {
    networks: {
        development: {
            host: 'testrpc',
            port: 8550,
            network_id: '*'
        },
        testnet: {
            host: 'testnet',
            port: 8545,
            network_id: '*'
        }
    }
};
