(function () {
    'use strict';

    angular
        .module('manutencao')
        .controller('ListarClientesController', ListarClientesController);

    ListarClientesController.$inject = [
        '$uibModal',
        'Restangular',
        'toastr'
    ];

    function ListarClientesController($uibModal, Restangular, toastr) {
        var vm = this;

        vm.listarClientes = function () {
            var usuarios = Restangular.all("cliente/listar-clientes");
            usuarios.post().then(function (response) {
                if (response.sucesso) {
                    vm.gridOptions.data = response.objeto;
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }

        vm.abrirModalCriarCliente = function () {
            $uibModal.open({
                ariaLabelledBy: 'Cliente',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/cliente/criar-cliente/criar-cliente.html',
                controller: 'CriarClienteController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    usuario: function () {
                        return  ;
                    }
                }
            }).result.then(function () {
                vm.listarClientes();
            });
        }

        vm.abrirModalEditarCliente = function (cliente) {
            $uibModal.open({
                ariaLabelledBy: 'Clientes',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/cliente/editar-cliente/editar-cliente.html',
                controller: 'EditarClienteController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    cliente: function () {
                        return cliente;
                    }
                }
            }).result.then(function () {
                vm.listarClientes();
            });
        }

        vm.gridOptions = {
            data: vm.listarClientes(),
            enableFiltering: true,
            enableColumnMenus: false,
            paginationPageSizes: [10, 25, 50, 100, 250, 500],
            columnDefs: [{
                name: 'Edit',
                width: '5%',
                enableFiltering: false,
                cellTemplate: '<div ng-class="\'ui-grid-cell-contents text-center\'">\
                                \<button type="button" ng-click="grid.appScope.vm.abrirModalEditarCliente(row.entity)" ng-class="\'btn btn-xs label label-warning\'">\
                                    Editar </div>\
                                </button>\
                            </div>'
            }, {
                width: '10%',
                name: 'Código',
                field: 'id',
                type: 'text'
            }, {
                width: '25%',
                name: 'Nome',
                field: 'nome',
                type: 'text'
            }, {
                width: '25%',
                name: 'Email',
                field: 'email',
                type: 'text'
            }, {
                width: '17%',
                name: 'Endereço',
                field: 'endereco',
                type: 'text'
            }, {
                width: '17%',
                name: 'Telefone',
                field: 'telefone',
                type: 'text'
            }]
        }
    }
})();
