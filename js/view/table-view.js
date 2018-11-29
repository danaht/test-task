(function () {
    
    const helpers = APP.helpers;
    const toUSD = helpers.toUSD;

    APP.views.table = (function () {
        
        const $search = $('.search');
        const $searchInput = $search.find('input');
        const $searchClear = $search.find('.clear');

        function _buildRow(name, count, price, id) {
            const templateRow = `<tr>
                    <td class="name">${name}
                        <span class="count badge badge-secondary badge-pill">${count}</span>
                    </td>
                    <td class="price">${toUSD(price)}</td>
                    <td class="actions">
                        <button type="button" class="btn btn-outline-primary my-1 edit dtndel" data-item-id="${id}" data-action="edit">Edit</button>
                        <button type="button" class="btn btn-outline-primary my-1 delete" data-item-id="${id}" data-action="delete">Delete</button>
                    </td>
                  </tr>`;
            return templateRow;
        };

        function renderRows(data) {
            const rows = data.reduce((accumulator, element) => accumulator + _buildRow(element.name, element.count, element.price, element.id), '');
            $('.table tbody').html(rows);
        };

        function changeArrowDirection(column) {
            
            $(`.${column} .sort a`).toggleClass('down');
        }

        function getValueFromSearch() {
            return $searchInput.val();
        }

        function showClearSearch() {
            $searchClear.removeClass('hide');
        }

        function hideClearSearch() {
            $searchClear.addClass('hide');
        }

        function clearValueSearch() {
            $searchInput.val('');
        }

        function getValueFromAddEdit() {
            var values;

            return values;
        }

        return {
            renderRows: renderRows,
            changeArrowDirection: changeArrowDirection,
            getValueFromSearch: getValueFromSearch,
            clearValueSearch: clearValueSearch,
            hideClearSearch: hideClearSearch,
            showClearSearch: showClearSearch,
            getValueFromAddEdit: getValueFromAddEdit
        };

    })();
})();