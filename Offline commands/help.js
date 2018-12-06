const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("**Help Menu**")
  .setColor("#f44242")
  .setThumbnail(bicon)
  .addField("!!8Ball", "!!8ball (message) ***(Kinda broken atm)***")
  .addField("!!ban", "!!ban (@user)")
  .addField("!!botinfo", "!!botinfo (Gives info on the bot.)")
  .addField("!!cat", "!!cat (Shows random cat pics.)")
  .addField("!!clear", "!!clear (#1-100) (Clears messages.)")
  .addField("!!dog", "!!dog (Shows random dog pics.)")
  .addField("!!gay", "!!gay (Rates you on gay scale 1-100%)")
  .addField("!!help", "!!help (Shows this menu.)")
  .addField("!!kick", "!!kick (@user)")
  .addField("!!pp", "!!pp (Rates how big your penis is on a scale 1-100%)")
  .addField("!!say", "!!say (message) (Bot will say what you want)")
  .addField("!!serverinfo", "!!serverinfo (Gives info on the server your in.)");

    return message.channel.send(botembed);
}

module.exports.help = {
  name: "help"
}
