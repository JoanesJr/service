var Service = require('node-windows').Service;
// Criando um novo objeto do Serviço
var svc = new Service({
    //Nome do servico
    name: 'StornoLCMSAP',
    //Descricao que vai aparecer no Gerenciamento de serviço do Windows
    description: 'This service Storn lcm with csv',
    //caminho absoluto do seu script
    script: 'C:\\service\\app.js'
});
svc.on('install', function () {
    svc.start();
});
// instalando o servico
svc.install();