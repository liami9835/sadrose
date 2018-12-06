const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: false});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

if(err) console.log(err);
let jsfile = files.filter(f => f.split(".").pop() === "js")
if(jsfile.length <= 0){
  console.log("Couldn't find commands.");
  return;
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);

  bot.commands.set(props.help.name, props);

  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("!!Help|Owner:liami98#6525", {type: "PLAYING"})

});

bot.on("message", async message => {
  if(message.author.bot) return; //Abort if this bot authored this message
  if(message.channel.type === "dm") return; //Abort if this was a DM

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = (messageArray[0]).toLowerCase();
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if(cmd === `${prefix}liamonlyplease`){
    return message.channel.send("@here\n***Hello everyone. I am Sad Rose. I am a java script built bot. I am made by liami98#6525. If you have any questions or suggestions for me please let him know. Other then that thank you for having me in this sever with you guys:)***\n ```My prefix is !! If you want commands please do !!help for more commands:D. Have a nice day!```")
  }
if(cmd === `${prefix}help`){
  // message.delete();
  message.author.sendMessage("```#1: !!8Ball, !!8ball (message) ***(Kinda broken atm)*** \n#2: !!ban, !!ban (@user) \n#3: !!botinfo, !!botinfo (Gives info on the bot.) \n#4: !!cat, !!cat (Shows random cat pics.) \n#5: !!clear, !!clear (#1-100) (Clears messages.) \n#6: !!dog, !!dog (Shows random dog pics.) \n#6: !!gay, !!gay (Rates you on gay scale 1-100%)\n#7: !!help, !!help (Shows this menu.) \n#8: !!kick, !!kick (@user)\n#9: !!pp, !!pp (Rates how big your penis is on a scale 1-100%) \n#10: !!say, !!say (message) (Bot will say what you want) \n#11: !!serverinfo, !!serverinfo (Gives info on the server your in.)```\n***If you have any questions or suggestions please dm liami98#6525 the owner and let him know!***")
  message.reply("**Please check your DMs for all help commands!**")
}



});

bot.login(botconfig.token);
