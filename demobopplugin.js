define(function () {
    return {
        data: {
            id: 'bop-form',
            amount: 0.0,
            currency: 'ZAR'
        },

        show: function () {
            document.getElementById(this.data.id).innerHTML =
                "<table border='1'>" +
                "<tr><td>Amount</td><td><input type='text' id='BOP-AMOUNT'</td></tr>" +
                "<tr><td>Currency</td><td><input type='text' id='BOP-CURRENCY'</td></tr>" +
                "</table>";

            this.updateForm();
        },

        updateForm: function () {
            document.getElementById("BOP-AMOUNT").value = this.data.amount;
            document.getElementById("BOP-CURRENCY").value = this.data.currency;
        },

        updateData: function () {
            this.data.amount = isNaN(parseFloat(document.getElementById("BOP-AMOUNT").value)) ? 0.0 : parseFloat(document.getElementById("BOP-AMOUNT").value);
            this.data.currency = document.getElementById("BOP-CURRENCY").value;
        },

        setAmount: function (amount) {
            if (typeof amount == 'number') {
                this.data.amount = amount;
            } else {
                var value = parseFloat(amount);
                this.data.amount = isNaN(value) ? 0.0 : value;
            }
        },

        setCurrency: function (currency) {
            this.data.currency = currency;
        },

        getData: function () {
            this.updateData();
            return this.data;
        },

        setData: function (data) {
            this.data = data;
        },

        errors: function() {
            var errors = [];

            this.updateData();
            if (this.data.currency != 'USD' && this.data.currency != 'ZAR') {
                errors.push('Only USD and ZAR are supported currencies');
            }
            if (this.data.amount < 0.0) {
                errors.push('The amount may not be negative');
            } else if (this.data.amount < 10.0) {
                errors.push('The minimum value is 10.00');
            }

            return errors;
        },

        errorCount: function () {
            return this.errors().length;
        },

        isValid: function () {
            return this.errorCount() == 0;
        }
    }
});