(function () {

    const helpers = APP.helpers;
    const guid = helpers.guid;
    const clone = helpers.clone;
    const toNumber = helpers.toNumber;

    APP.models.data = (function () {

        let data = [{
            name: "Goods 5",
            count: 4,
            price: 19900000,
            id: guid()
        }, {
            name: "goods 1",
            count: 5,
            price: 19900000.90,
            id: guid()
        }, {
            name: "Goo 7",
            count: 8,
            price: 11400000.3,
            id: guid()
        }, {
            name: "Goo 3",
            count: 12,
            price: 15000000.99,
            id: guid()
        }, {
            name: "goods 3",
            count: 102,
            price: 100.99,
            id: guid()
        }];

        function sortData(data, column, order) {
            const newData = clone(data);
            if (column === 'name') {
                newData.sort(function (a, b) {
                    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
                })
            }
            else if (column === 'price') {
                newData.sort(function (a, b) {
                    return a.price - b.price;
                })
            }
            if (!order) {
                newData.reverse();
            }
            return newData;
        }

        function getData() {
            return clone(data);
        }

        function setData(newdata) {
            data = newdata;
        }

        function add(item, currentId) {
            let data = getData();
            if (currentId) {
                item.id = currentId;
                data = data.filter(function (item) {
                    return item.id !== currentId;
                });
            }
            else {
                item.id = guid();
            }
            item.count = Number(item.count);
            item.price = Number(item.price);
            data.push(item);
            return data;
        }

        function remove(id) {
            data = data.filter(item => item.id !== id);
        }

        function getElement(id) {
            return data.find((element) => element.id === id);
        }

        return {
            getData: getData,
            setData: setData,
            remove: remove,
            add: add,
            getElement: getElement,
            sortData: sortData
        }
    })();
})();
