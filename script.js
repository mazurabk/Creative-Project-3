/*
Code by: Kallas Mazura

*/
let API_URI = "https://api.iextrading.com/1.0";
let UPDATE_INTERVAL = 5 * 1000;

let app = new Vue({
  el: "#app",

  data: {
    loading: true,
    errored: false,
    tickerSymbol: "",
    stockData: {}
  },

  created: function() {
    this.getStockData();
  },

  methods: {
    getStockData: function() {
      let self = this;

      axios
        .get(
          API_URI + "/stock/aapl/batch?types=quote,news,chart&range=1m&last=10"
        )
        .then(response => {
          this.stockData = response.data.quote;
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          errored = true;
        });
    }
  }
});

setInterval(() => {
  app.getStockData();
}, UPDATE_INTERVAL);
