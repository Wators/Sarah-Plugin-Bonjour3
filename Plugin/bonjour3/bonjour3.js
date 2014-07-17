exports.action = function(data, callback, config, SARAH){
    var api_url;

    config = config.modules.bonjour3;

    if ( !config.name ) {
    console.log( "merci config missing" );

    callback( {
      tts: "J'ai besoin de ton nom pour répondre"
    } );

    return;
  }

  var name = config.name;

  var answers = [

  "Bonjour" + name,
  "Bonjour, avez vous bien dormi" + name,
  "Ravi de vous entendre"
  ];

    var exec = require('child_process').exec;

    var ip = config.api_url_ssh_ip;
    var user = config.api_url_ssh_user;
    var pass = config.api_url_ssh_pass;
    var command = data.cmd_bash;

    var process = '%CD%/plugins/bonjour3/bin/putty';

    process += ' -ssh ' + user + '@' + ip + ' -pw ' + pass + ' -m %CD%/plugins/bonjour3/bin/scripts/' + command + ' & exit &';
    
    console.log(process);

    var child = exec(process,function (error, stdout, stderr) {""});
    
    callback( {
    tts: answers[ Math.floor( Math.random() * answers.length ) ]});
}
