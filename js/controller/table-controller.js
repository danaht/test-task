(function () {
    'use strict';
    const model = APP.models.data;
    const view = APP.views.table;
    const helpers = APP.helpers;
    const validation = APP.models.validation.validation;
    let currentId;

    APP.controllers.table = (function () {

        const orders = {
            name: true,
            price: true,
        }

        let priceClipboard = '';

        function _initialization() {
            const data = model.getData();
            view.renderRows(data);
        }

        function _getSortOrder(column) {
            return orders[column];
        }

        function _changeSortOrder(column) {
            orders[column] = !orders[column];
            view.changeArrowDirection(column);
        }

        function _sort(column, data) {
            let sortedData;
            let order = _getSortOrder(column);
            sortedData = model.sortData(data, column, order);
            view.renderRows(sortedData);
            model.setData(data);
            _changeSortOrder(column);
        }

        function _addItem() {
            const $modal = $('.modal-add-edit');
            const values = {};
            const isValid = {};
            $modal.find('.form-control').each(function (element) {
                if (this.name === 'price') {
                    values[this.name] = priceClipboard;
                    isValid.price = validation(priceClipboard, 'price');
                }
                else {
                    values[this.name] = this.value;
                    isValid[this.name] = validation(this.value, this.name);
                }
            });
            if (isValid.name && isValid.count && isValid.price) {
                const data = model.add(values, currentId);
                $modal.modal('hide')
                view.renderRows(data);
                model.setData(data);
                _search();
            }
        }

        function _deleteItem() {
            model.remove(currentId);
            const data = model.getData();
            view.renderRows(data);
        }

        function _search() {
            const value = view.getValueFromSearch();
            if (value.length > 0) {
                const data = model.getData();
                const resultSearch = data.filter(function (object) {
                    return object.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
                })
                const isSearchActive = true;
                view.renderRows(resultSearch);
                view.showClearSearch();
            }
        }

        function _clearSearch() {
            view.clearValueSearch();
            view.hideClearSearch();
            const data = model.getData();
            view.renderRows(data);
        }

        const actionHandlers = {

            delete: () => {
                $('.modal-delete').modal('show')
            },
            edit: (id) => {
                const $modal = $('.modal-add-edit');
                const element = model.getElement(id);
                $modal.find('.form-control').each(function () {
                    const value = element[this.name];
                        if (value) {
                            if (this.name==='price') { 
                                this.value = helpers.toUSD(value);
                            }
                            else {
                                this.value = value;
                            }
                        }
                    });
                $modal.modal('show').find('.add').html('Update');
            }
        }

        $(function () {

            _initialization();

            $('.sort').on('click', function (event) {
                event.preventDefault();
                const currentData = model.getData();
                const column = $(this).parent().attr('class');
                view.clearValueSearch();
                view.hideClearSearch();
                _sort(column, currentData);
            });

            const $search = $('.search');

            $search.submit(function (event) {
                event.preventDefault();
            });

            $search.find('input').keyup(function (event) {
                event.preventDefault();
                const value = view.getValueFromSearch();
                if (value.length === 0) {
                    _clearSearch();
                }
            });

            $search.find('.btn').on('click', function (event) {
                event.preventDefault();
                _search();
            });

            $search.find('.clear').on('click', function (event) {
                event.preventDefault();
                _clearSearch();
            });

            $('.modal-delete .yes').on('click', function (event) {
                event.preventDefault();
                view.clearValueSearch();
                view.hideClearSearch();
                _deleteItem();
            });

            $('.table tbody').on('click', function (event) {
                event.preventDefault();
                currentId = event.target.dataset.itemId;
                const action = event.target.dataset.action;
                const handler = actionHandlers[action];
                if (handler) {
                    handler(currentId);
                }
            });

            $('.add-new').on('click', function (event) {
                event.preventDefault();
                const $modal = $('.modal-add-edit');
                $modal.find('.form-control').each(function () {
                    this.value = '';
                });
                currentId = '';
                priceClipboard = '';
                const $modalInput = $modal.find('input');
                const $modalSmall = $modal.find('small');
                const borderDanger = 'border-danger';
                const hide = 'hide';
                $modalInput.removeClass(borderDanger);
                $modalSmall.addClass(hide);
                $modal.find('.add').html('Add');
            });

            const $modalAddEdit = $('.modal-add-edit');
            const $modalAddEditAllInput = $modalAddEdit.find('input');

            $modalAddEditAllInput.on('blur', function () {
                validation(this.value, this.name);
                if (this.name === 'price') {
                    let value = $(this).val();
                    priceClipboard = value;
                    value = helpers.toUSD(value);
                    if (value) {
                        $(this).val(value);
                    }
                }

            });

            $modalAddEdit.find('.input-price input').on('focus', function () {
                const value = $(this).val();
                const pattern = /[\$,]/g;
                const price = value.replace(pattern, "");
                $(this).val(price);
            });

            $modalAddEdit.find('.input-count input')
                .on('input', function () {
                    let value = $(this).val();
                    value = validation(value, 'count');
                })
                .on('paste', function (event) {
                    event.preventDefault();
                });

            $modalAddEdit.find('.add').on('click', function (event) {
                event.preventDefault();
                _addItem();
            });

        });

    })();
})();