require('dotenv').config();

const { Client } = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Client();
const PREFIX = '$';

client.on('ready',() =>{
    console.log(`${client.user.username} has logged in.`);
});

client.on('message',(message)=>{
if(message.author.bot) return;
if(message.content.startsWith(PREFIX)){
    const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(" ");
     console.log(CMD_NAME);
     console.log(args);

     if(CMD_NAME === 'kick'){
         if (message.member.hasPermission('KICK_MEMBERS')) return message.reply('You are not mature enough')
         if(args.length === 0) return message.reply('Please provide an Id.');
         const member = message.guild.members.cache.get(args[0]);
         if(member) {
             member.kick().then((member) => message.channel.send(`${member} was kicked`)).catch((err) => message.channel.send("No permission"));

         }else{
             message.channel.send('Kicked Succesfully')
         }
     }
}
});

client.on('message',(message) => {
    if(message.author.bot) return;
    if(message.content === 'hello'){
        message.channel.send('Hello')
    }
    if(message.content === 'Gm'){
        message.channel.send('Good Morning')
    }
    
});



client.on('message' , async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) return

    const args = message.content.substring(PREFIX.length).split(" ")

    if(message.content.startsWith(`${PREFIX}play`)) {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("You need to join voice channel")
        const permission = voiceChannel.permissionsFor(message.client.user)
        if(!permission.has('CONNECT')) return message.channel.send("No permission Noob")
        if(!permission.has('CONNECT')) return message.channel.send("No permission to speak")
        
        try{
            var connection = await voiceChannel.join()

        } catch (error){
            console.log('Error in connection')
            message.channel.send('Error while connecting')
        }
    
        const dispatcher = connection.play(ytdl(args[1]))
        .on('finish', () => {
            voiceChannel.leave()
        })
        .on('error' ,error => {
            console.log(error)
        })
        dispatcher.setVolumeLogarithmic(5 / 5)
    } else if(message.content.startsWith(`${PREFIX}stop`)){
        if(!message.content.voice.channel) return message.channel.send("You need to be in voice channel")
        message.member.voice.channel.leave()
        return undefined
    }
});





client.login(process.env.DISCORDJS_BOT_TOKEN);

