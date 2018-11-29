(function () {

    APP.helpers = (function () {

        function _s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        function guid() {
            return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
        }

        function toUSD(price) {
            price = Number(price);
            if (!isNaN(price)) {
                const priceInUSD = price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                });
                return priceInUSD;
            }
            return false;
        }

        function clone(arr) {
            return arr.slice(0);
        }

        return {
            clone: clone,
            guid: guid,
            toUSD: toUSD,
        }

    })();

})();
