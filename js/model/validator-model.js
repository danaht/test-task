(function () {

    APP.models.validation = (function () {

        function _name(value) {
            let error;
            if (!value.trim().length) {
                return error = "The field can't be empty";
            } else if (value.length > 15) {
                return error = "Maximum name length is 15 characters";
            }
        }

        function _count(value, $modalInput) {
            const pattern = /\D/g;
            const result = value.replace(pattern, '');
            $modalInput.val(result);
            if (pattern.test(value)) {
                return error = "The count can consist only digits"
            }
        }

        function _price(value) {
            const pattern = /^\s*\d*\.?\d*\s*$/;
            if (value.trim().length){
                if(!pattern.test(value)) {
                return error = "The price should be in 12345.67 format.";
            }}
        }

        function validation(value, field) {
            let result;
            let errorMessage;
            let isValid
            const $modal = $(`.modal-add-edit .input-${field}`);
            const $modalInput = $modal.find('input');
            const $modalSmall = $modal.find('small');
            const borderDanger = 'border-danger';
            const hide = 'hide';
            if (field === 'name') {
                result = _name(value);
            } else if (field === 'count') {
                result = _count(value, $modalInput);
            } else if (field === 'price') {
                result = _price(value);
            }
            if (result) {
                $modalInput.addClass(borderDanger);
                $modalSmall.removeClass(hide).html(result);

                return isValid = false;
            }
            $modalInput.removeClass(borderDanger);
            $modalSmall.addClass(hide).html(result);
            return isValid = true;
        }

        return {
            validation: validation
        }

    })();
    
})();