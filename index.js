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
  bot.user.setActivity("!!Help", {type: "PLAYING"})

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

  if(cmd === `${prefix}hello`){
      return message.channel.send("**Hello!**")
  }

if(cmd === `${prefix}help`){
  message.author.sendMessage("!!8Ball, !!8ball (message) ***(Kinda broken atm)***")
  message.author.sendMessage("!!ban, !!ban (@user)")
    message.author.sendMessage("Will be adding all of them soon just to lazy and tired")
  message.reply("**Please check your DMs for all help commands!**")
}



});

bot.login(botconfig.token);
