Object.assign(global, { WebSocket: require('ws') });

const WebSocketClient = require('@mattermost/client').WebSocketClient;

const Client4 = require('@mattermost/client').Client4;


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
				const wsClient = new WebSocketClient();
				wsClient.initialize(`wss://${config.host}/api/v4/websocket`, node.credentials.pat);
				wsClient.addCloseListener(() => {
					wsClient.serverSequence = 0;
				});

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
