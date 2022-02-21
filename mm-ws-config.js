Object.assign(global, { WebSocket: require('ws') });
Object.assign(global, { fetch: require('node-fetch').default });

const wsClient = require('mattermost-redux/client/websocket_client.js').default;

const Client4 = require('mattermost-redux/client/client4.js').default;


module.exports = function (RED) {
	function MMConfigNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.name = config.name;
		node.host = config.host;
		node.httpPort = config.httpPort;
		node.wsClient = null;
		node.client4 =  new Client4();
		node.client4.setUrl(`https://${config.host}:${config.httpPort}`);
		node.client4.setToken(node.credentials.pat);

		node.createClient = function () {
			if (!node.wsClient) {
				wsClient.initialize(node.credentials.pat, {connectionUrl: `wss://${config.host}/api/v4/websocket`});

				node.wsClient = wsClient;
			}
		}

		node.createClient();
	}
	RED.nodes.registerType("mm-ws-config", MMConfigNode,{
		credentials: {
			pat: {type: 'password'}
		}
	});
}