Vue.component('converter', {
    template: "<div>" +
    "<h1>Converter</h1>" +
    "<div>" +
    "<p class='sub-title' style='margin: 0px;'>From</p>" +
    "   <input type='number' class='conversionFiled' v-model='currencyFromAmount'>" +
    "   <select v-model=\"currencyFrom\" v-bind:onselect='getConversationRate()'>" +
    "       <option value='RUB'>Russian Ruble</option>\n" +
    "       <option value='EUR'>Euro</option>" +
    "   </select>" +
    "</div>" +
    "<div>" +
    "<p class='sub-title' style='margin: 0px;'>To</p>" +
    "   <input type='number' v-bind:value='currencyToValue' disabled>" +
    "   <select v-model=\"currencyTo\" v-bind:onselect='getConversationRate()'>" +
    "       <option value='RUB'>Russian Ruble</option>\n" +
    "       <option value='EUR'>Euro</option>" +
    "   </select>" +
    "  </div>" +
    "</div>",
    data: function () {
        return {
            currencyFrom: '',
            currencyTo: '',
            currencyConversionRate: 1,
            currencyFromAmount: 1,
            subTitleStyle: {
                margin: '0px'
            }
        }
    },
    computed: {
        currencyToValue: function () {
            return this.currencyFromAmount * this.currencyConversionRate;
        }
    },
    methods: {
        getConversationRate: function () {
            if (this.currencyFrom !== "" && this.currencyTo !== "") {
                this.$http.get(
                    'https://min-api.cryptocompare.com/data/price?fsym=' +
                    this.currencyFrom +
                    '&tsyms=' +
                    this.currencyTo
                ).then(response => {
                    this.currencyConversionRate = response.data[this.currencyTo];
                }, response => {
                });
            }
        }
    }

});

var app = new Vue({
    el: '#app'
});
