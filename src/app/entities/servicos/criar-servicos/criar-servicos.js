(function () {
    'use strict';

    angular
        .module('manutencao')
        .controller('CriarServicoController', CriarServicoController);

    CriarServicoController.$inject = [
        '$uibModal',
        '$uibModalInstance',
        '$location',
        'Restangular',
        'toastr'
    ];

    function CriarServicoController($uibModal, $uibModalInstance, $location, Restangular, toastr) {
        var vm = this;
        vm.servico = {
            data_ini: new Date().toLocaleString(),
            data_fim: null,
            descricao: "",
            id_cliente: null,
            cliente: "",
            status: "PENDENTE",
            valor: null,           
            marca: "",
            tipo: "",
            prioridade: "" 
        }
        vm.listaClientes = [];

        vm.buscarTodosClientes = function() {
            var clientes = Restangular.all("cliente/listar-clientes");
            clientes.post().then(function(response) {
              if (response.sucesso) {
                vm.listaClientes = response.objeto;
              } else {
                toastr.error(response.mensagem);
              }
            });
          }

        vm.criarServico = function () {
            // if (vm.listaClientes < 1) {
            //     toastr.error("Selecione um cliente!");
            //     return;
            // }
            // if (vm.listaClientes.length > 1) {
            //     toastr.error("Selecione somente um cliente!");
            //     return;
            // }
            if (!vm.servico.prioridade) {
                toastr.error("Selecione uma prioridade!");
                return;
            }
            if (!vm.servico.marca) {
                toastr.error("O campo marca não pode ser nulo!");
                return;
            }
            if (!vm.servico.tipo) {
                toastr.error("O campo tipo não pode ser nulo!");
                return;
            }
            if (!vm.servico.descricao) {
                toastr.error("O campo descricao não pode ser nulo!");
                return;
            }


            vm.servico.id_cliente = vm.listaClientes[0].id;
            vm.servico.cliente = vm.listaClientes[0].nome;



            var criarServico = Restangular.all("servico/criar-servico");
            criarServico.post(vm.servico).then(function (retornoCadastro) {
                if (retornoCadastro.sucesso) {
                    toastr.success(retornoCadastro.mensagem);
                    $uibModalInstance.close(true);
                } else { toastr.error("Erro ao salvar"); }
            })
        }

        vm.buscarTodosClientes();
    }
})();
