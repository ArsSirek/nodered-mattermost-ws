
module.exports = function(RED) {
	function mmWsSend(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.host = RED.nodes.getNode(config.host);

		node.on('input', function (msg) {

			if (!node.host.client) {
				node.host.createClient();
			}

			node.status({
				fill: "orange",
				shape: "dot",
				text: `Try to send...`
			});


			var params = {
				channel_id: msg[config.channel_id],
				message: msg[config.message],
			};
			if (config.attachments) {
				params.props = {attachments: msg[config.attachments]};
			}

			node.host.client4.createPost(params).then(function () {
				node.status({
					fill: "green",
					shape: "dot",
					text: `message sent`
				});

			});
		});
	}
	RED.nodes.registerType("mm-ws-send", mmWsSend);
}
