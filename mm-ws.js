Object.assign(global, { WebSocket: require('ws') });
const wsClient = require('mattermost-redux/client/websocket_client.js').default;

module.exports = function(RED) {
	function mmWs(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.send({config});

		wsClient.initialize(config.pat, {connectionUrl: 'wss://' + config.host + '/api/v4/websocket'});
		wsClient.setEventCallback((event) => {
			switch (event.event) {
				case 'posted': {
					const post = JSON.parse(event.data.post);
					node.send({payload:{...event, ...post}});
					break;
				}
				default:
					if (config.events === 'all') {
						node.send({event});
					}
			}
		});
	}
	RED.nodes.registerType("mm-ws",mmWs);
}
