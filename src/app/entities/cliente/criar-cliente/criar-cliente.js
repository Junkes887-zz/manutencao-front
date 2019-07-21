(function () {
    'use strict';

    angular
        .module('manutencao')
        .controller('CriarClienteController', CriarClienteController);

    CriarClienteController.$inject = [
        '$uibModal',
        '$uibModalInstance',
        '$location',
        'Restangular',
        'toastr'
    ];

    function CriarClienteController($uibModal, $uibModalInstance, $location, Restangular, toastr) {
        var vm = this;
        vm.cliente = {
            nome: "",
            email: "",
            endereco: "",
            telefone: ""
        }

        vm.criarCliente = function () {
            if (!vm.cliente.nome) {
                toastr.error("O campo nome é obrigatório!");
                return; 
            } if (!vm.telefoneValido()) {
                toastr.error("O numero de telefone não é valido!");
                return;
            } if (!vm.emailValido()) {
                toastr.error("O email não é valido!");
                return;
            }

            var criarCliente = Restangular.all("cliente/criar-cliente");
            criarCliente.post(vm.cliente).then(function (retornoCadastro) {
                if (retornoCadastro.sucesso) {
                    toastr.success(retornoCadastro.mensagem);
                    $uibModalInstance.close(true);
                } else { toastr.error("Erro ao salvar"); }
            })
        }

        vm.telefoneValido = function () {
            var regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
            return regex.test(vm.cliente.telefone);
        }

        vm.emailValido = function () {
            var regex = new RegExp('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$');
            return regex.test(vm.cliente.email);
        }

    }
})();
