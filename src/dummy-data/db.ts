export const conversations = [
	{
		_id: "1",
		admin: "user1",
		groupImage: null,
		groupName: "Group A",
		participants: ["user1", "user2", "user3"],
		_creationTime: 1638232272, // Unix timestamp
		lastMessage: {
			_id: "1",
			messageType: "text",
			content: "Hello everyone!",
			sender: "user1",
		},
		sender: "user1",
		isOnline: true,
	},
	{
		_id: "2",
		admin: null,
		groupImage: "https://avatars.githubusercontent.com/u/75279146?v=4",
		groupName: null,
		participants: ["user4", "user5"],
		_creationTime: 1638235872,
		lastMessage: {
			_id: "2",
			messageType: "text",
			content: "Hey there!",
			sender: "user2",
		},
		sender: "user4",
		isOnline: true,
	},
	{
		_id: "3",
		admin: null,
		groupImage: null,
		groupName: null,
		participants: ["user6", "user7"],
		_creationTime: 1638239472,
		lastMessage: {
			_id: "3",
			messageType: "image",
			content: "image_url.jpg",
			sender: "user6",
		},
		sender: "user6",
		isOnline: false,
	},
	{
		_id: "4",
		admin: null,
		groupImage:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
		groupName: null,
		participants: ["user8", "user9", "user10"],
		_creationTime: 1638243072, 
		lastMessage: {
			_id: "4",
			messageType: "video",
			content: "video_url.mp4",
			sender: "user9",
		},
		sender: "user9",
		isOnline: true,
	},
];

export const messages = [
	{
		_id: "1",
		content: "Hello everyone!",
		sender: "user1",
		messageType: "text",
	},
	{
		_id: "2",
		content: "Hey there!",
		sender: "user2",
		messageType: "text",
	},
	{
		_id: "3",
		content: "How's it going!?",
		sender: "user1",
		messageType: "text",
	},
	{
		_id: "4",
		content: "Fine, thanks!",
		sender: "user2",
		messageType: "text",
	},
];

export const users = [
	{
		_id: "user1",
		name: "code 1",
		email: "code1@email.com",
		image: "https://randomuser.me/api/portraits/men/67.jpg",
		admin: true,
		isOnline: true,
	},
	{
		_id: "user2",
		name: "code 2",
		email: "code2@email.com",
		image: "https://randomuser.me/api/portraits/women/67.jpg",
		isOnline: true,
	},
	{
		_id: "user3",
		name: "code 3",
		email: "code3@email.com",
		image: "https://randomuser.me/api/portraits/women/68.jpg",
		isOnline: false,
	},
];