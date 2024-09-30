module.exports = function(RED) {
    function mmWsListen(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.host = RED.nodes.getNode(config.host);

        const reconnectIntervalBase = 1000;
        const maxReconnectInterval = 32000;
        let reconnectAttempts = 0;

        function exponentialBackoffReconnect() {
            const reconnectInterval = Math.min(reconnectIntervalBase * Math.pow(2, reconnectAttempts), maxReconnectInterval);
            reconnectAttempts += 1;

            node.log(`Attempting to reconnect in ${reconnectInterval / 1000} seconds...`);

            setTimeout(() => {
                try {
                    node.host.createClient();
                    setupWebSocketListeners();
                    reconnectAttempts = 0;
                } catch (error) {
                    node.error("Reconnection attempt failed: " + error);
                    exponentialBackoffReconnect();
                }
            }, reconnectInterval);
        }

        function setupWebSocketListeners() {
            node.host.wsClient.setEventCallback((event) => {
                switch (event.event) {
                    case 'posted': {
                        const post = JSON.parse(event.data.post);
                        node.send({payload: {...event, ...post}});
                        break;
                    }
                    default:
                        if (config.events === 'all') {
                            node.send({event});
                        }
                }
            });

            node.host.wsClient.onclose = () => {
                node.error("WebSocket connection lost. Attempting to reconnect...");
                exponentialBackoffReconnect();
            };

            node.host.wsClient.onerror = (error) => {
                node.error("WebSocket error: " + error);
            };
        }

        if (!node.host.wsClient) {
            try {
                node.host.createClient();
                setupWebSocketListeners();
            } catch (error) {
                node.error("Failed to create WebSocket client: " + error);
                exponentialBackoffReconnect();
            }
        } else {
            setupWebSocketListeners();
        }
    }

    RED.nodes.registerType("mm-ws-listen", mmWsListen);
}
