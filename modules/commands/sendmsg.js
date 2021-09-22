module.exports.config = {
	name: "sendmsg",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "Gửi tin nhắn tới các nhóm theo ID!",
	commandCategory: "Admin",
	usages: "ID [Text]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 //if (!args[0]) return api.sendMessage(`${api.getthreadID()}`, event.threadID);
    
	var idbox = args[0];
    var reason = args.slice(1);
	//let threadID = await api.getThreadID();
	if (args.length == 0) api.sendMessage("Sai cú pháp: sendmsg ID_BOX [lời nhắn]", event.threadID, event.messageID);
	
	else if(reason == "")api.sendMessage("Vui lòng nhập nhập đúng cú pháp: sendmsg ID_BOX [lời nhắn]", event.threadID, event.messageID);
	
	else
		api.sendMessage("» Thông tin từ Admin «\n\n" + reason.join(" "), idbox, () =>
			api.sendMessage(`${api.getCurrentUserID()}`, () =>
				api.sendMessage("Đã gửi lời nhắn: " + reason.join(" "), event.threadID)));
}
