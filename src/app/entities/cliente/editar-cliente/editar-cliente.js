(function () {
    'use strict';
  
    angular
      .module('manutencao')
      .controller('EditarClienteController', EditarClienteController);
  
    EditarClienteController.$inject = [
      '$uibModal',
      '$uibModalInstance',
      '$location',
      'Restangular',
      'toastr',
      'cliente'
    ];
  
    function EditarClienteController($uibModal, $uibModalInstance, $location, Restangular, toastr, cliente) {
      var vm = this;
      if (!!cliente) {
        vm.cliente = {
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email,
          endereco: cliente.endereco,
          telefone: cliente.telefone
        }
      }
  
      vm.editarCliente = function () {
        var editarCliente = Restangular.all("cliente/editar-cliente");
        editarCliente.post(vm.cliente).then(function (retornoCadastro) {
          if (retornoCadastro.sucesso) {
            toastr.success(retornoCadastro.mensagem);
            $uibModalInstance.close(true);
          } else { toastr.error("Erro ao salvar"); }
        })
      }
    }
  })();
  