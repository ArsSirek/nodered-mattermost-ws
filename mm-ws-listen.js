
module.exports = function(RED) {
	function mmWsListen(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.host = RED.nodes.getNode(config.host);

		if (!node.host.wsClient) {
			node.host.createClient();
		}

		node.host.wsClient.setEventCallback((event) => {
			console.log('event', event);
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
	RED.nodes.registerType("mm-ws-listen", mmWsListen);
}
