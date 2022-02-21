adds Node to listen to all events on a mattermost websocket for a user by Personal Access Token
adds Node to send messages with attachments support 

this module uses mattermost-redux/client/websocket_client.js  and mattermost-redux/client/client4.js to work with mattermost web sockets and HTTP API correspondingly

#mm-ws-listen
simply listens to all websocket events mattermost will send to authorized user.
received messaged contain event type and data field with details
- for posted event type we copy all fields from data.post to the main payload for convenience

#mm-ws-send
simply calls mattermost createPost API endpoint (see https://api.mattermost.com/#operation/CreatePost for details)
supported parameters are
 - channel_id
 - message
 - attachments (see https://developers.mattermost.com/integrate/admin-guide/admin-message-attachments/ for details)

#attachments integration
see examples flow for details