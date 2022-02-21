[
	{
		"id": "f98269c33787fe6d",
		"type": "mm-ws-send",
		"z": "f6f2187d.f17ca8",
		"name": "Send to MM",
		"host": "525c3d18310d1390",
		"channel_id": "channel_id",
		"message": "message",
		"attachments": "attachments",
		"x": 730,
		"y": 640,
		"wires": []
	},
	{
		"id": "f6d5537e5d3f4027",
		"type": "inject",
		"z": "f6f2187d.f17ca8",
		"name": "",
		"props": [
			{
				"p": "message",
				"v": "",
				"vt": "str"
			},
			{
				"p": "channel_id",
				"v": "p17x6zpeiffozg65sjcrskjk8c",
				"vt": "str"
			}
		],
		"repeat": "",
		"crontab": "",
		"once": false,
		"onceDelay": 0.1,
		"topic": "",
		"x": 410,
		"y": 640,
		"wires": [
			[
				"0fec5bde9059faa7"
			]
		]
	},
	{
		"id": "0fec5bde9059faa7",
		"type": "function",
		"z": "f6f2187d.f17ca8",
		"name": "",
		"func": "msg.attachments =  [\n    {\n      \"pretext\": \"This is the attachment pretext.\",\n      \"text\": \"This is the attachment text.\",\n      \"actions\": [\n        {\n          \"id\": \"message\",\n          \"name\": \"Ephemeral Message\",\n          \"integration\": {\n            \"url\": \"http://127.0.0.1:1880/mattermost\",\n            \"context\": {\n              \"action\": \"do_something_ephemeral\"\n            }\n          }\n        }, {\n          \"id\": \"update\",\n          \"name\": \"Update\",\n          \"integration\": {\n            \"url\": \"http://127.0.0.1:1880/mattermost\",\n            \"context\": {\n              \"action\": \"do_something_update\"\n            }\n          }\n        }\n      ]\n    }\n  ]\nreturn msg;",
		"outputs": 1,
		"noerr": 0,
		"initialize": "",
		"finalize": "",
		"libs": [],
		"x": 560,
		"y": 640,
		"wires": [
			[
				"f98269c33787fe6d"
			]
		]
	},
	{
		"id": "525c3d18310d1390",
		"type": "mm-ws-config",
		"name": "mattermost connection",
		"host": "mattermost.com",
		"httpPort": "443"
	}
]