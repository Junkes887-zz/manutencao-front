(function () {
    'use strict';

    angular
        .module('manutencao')
        .controller('ListarServicosController', ListarServicosController);

    ListarServicosController.$inject = [
        '$uibModal',
        'Restangular',
        'toastr'
    ];

    function ListarServicosController($uibModal, Restangular, toastr) {
        var vm = this;

        vm.listarServico = function () {
            var servico = Restangular.all("servico/listar-servicos");
            servico.post().then(function (response) {
                if (response.sucesso) {
                    vm.gridOptions.data = response.objeto;
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }

        vm.abrirModalGerarServico = function () {
            $uibModal.open({
                ariaLabelledBy: 'Servico',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/servicos/criar-servicos/criar-servicos.html',
                controller: 'CriarServicoController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    servico: function () {
                        return;
                    }
                }
            }).result.then(function () {
                vm.listarServico();
            });
        }

        vm.abrirModalEditarServico = function (servico) {
            if (servico.status == "FINALIZADO") {
                toastr.error("O serviço já esta finalizado!");
                return;
            }
            $uibModal.open({
                ariaLabelledBy: 'servico',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/servicos/editar-servico/editar-servico.html',
                controller: 'EditarServicoController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    servico: function () {
                        return servico;
                    }
                }
            }).result.then(function () {
                vm.listarServico();
            });
        }

        vm.abrirModalFinalizarServico = function (servico) {
            if (servico.status == "FINALIZADO") {
                toastr.error("O serviço já esta finalizado!");
                return;
            }   
            $uibModal.open({
                ariaLabelledBy: 'servico',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/servicos/finalizar-servico/finalizar-servico.html',
                controller: 'FinalizarServicoController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    servico: function () {
                        return servico;
                    }
                }
            }).result.then(function () {
                vm.listarServico();
            });
        }

        vm.gridOptions = {
            data: vm.listarServico(),
            enableFiltering: true,
            enableColumnMenus: false,
            paginationPageSizes: [10, 25, 50, 100, 250, 500],
            columnDefs: [{
                name: 'Edit',
                width: '5%',
                enableFiltering: false,
                cellTemplate: '<div ng-class="\'ui-grid-cell-contents text-center\'">\
                                \<button type="button" ng-click="grid.appScope.vm.abrirModalEditarServico(row.entity)" ng-class="\'btn btn-xs label label-warning\'">\
                                    Editar </div>\
                                </button>\
                            </div>'
            }, {
                name: 'Finalizar',
                width: '8%',
                enableFiltering: false,
                cellTemplate: '<div ng-class="\'ui-grid-cell-contents text-center\'">\
                                \<button type="button" ng-click="grid.appScope.vm.abrirModalFinalizarServico(row.entity)" ng-class="\'btn btn-xs label label-primary\'">\
                                    Finalizar </div>\
                                </button>\
                            </div>'
            }, {
                width: '10%',
                name: 'Prioridade',
                field: 'prioridade',
                type: 'string'
            }, {
                width: '10%',
                name: 'Status',
                field: 'status',
                type: 'string'
            }, {
                width: '10%',
                name: 'Código',
                field: 'id',
                type: 'number'
            }, {
                width: '25%',
                name: 'Descricao',
                field: 'descricao',
                type: 'string'
            }, {
                width: '25%',
                name: 'Valor',
                field: 'valor',
                type: 'number'
            }, {
                width: '25%',
                name: 'Data ini',
                field: 'data_ini',
                type: 'string'
            }, {
                width: '17%',
                name: 'Data fim',
                field: 'data_fim',
                type: 'string'
            }, {
                width: '17%',
                name: 'Cod. cliente',
                field: 'id_cliente',
                type: 'number'
            }, {
                width: '17%',
                name: 'Cliente',
                field: 'cliente',
                type: 'string'
            }, {
                width: '17%',
                name: 'Cod. responsavel',
                field: 'id_responsavel',
                type: 'number'
            }, {
                width: '17%',
                name: 'Responsavel',
                field: 'responsavel',
                type: 'string'
            }, {
                width: '17%',
                name: 'Tipo de produto',
                field: 'tipo',
                type: 'string'
            }, {
                width: '17%',
                name: 'Marca',
                field: 'marca',
                type: 'string'
            }, {
                width: '17%',
                name: 'Observação',
                field: 'observacao',
                type: 'string'
            }]

        }
    }
})();
