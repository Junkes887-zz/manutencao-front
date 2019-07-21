(function () {
    'use strict';

    angular
        .module('manutencao')
        .controller('CriarUsuarioController', CriarUsuarioController);

    CriarUsuarioController.$inject = [
        '$uibModal',
        '$uibModalInstance',
        '$location',
        'Restangular',
        'toastr'
    ];

    function CriarUsuarioController($uibModal, $uibModalInstance, $location, Restangular, toastr) {
        var vm = this;
        vm.usuario = {
            nome: "",
            email: "",
            senha: "",
            permissao: ""
        }

        vm.criarUsuario = function () {
            if (!vm.usuario.nome) {
                toastr.error("O campo nome é obrigatório!");
                return; 
            }
            if (!vm.usuario.senha) {
                toastr.error("O campo senha é obrigatório!");
                return; 
            }
            if (!vm.usuario.permissao) {
                toastr.error("O campo permissão é obrigatório!");
                return; 
            }
            if (!vm.emailValido()) {
                toastr.error("O email não é valido!");
                return;
            }

            var criarUsuario = Restangular.all("usuario/criar-usuario");
            criarUsuario.post(vm.usuario).then(function (retornoCadastro) {
                if (retornoCadastro.sucesso) {
                    toastr.success(retornoCadastro.mensagem);
                    $uibModalInstance.close(true);
                } else { toastr.error("Erro ao salvar"); }
            })
        }

        vm.emailValido = function () {
            var regex = new RegExp('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$');
            return regex.test(vm.usuario.email);
        }
    }
})();
