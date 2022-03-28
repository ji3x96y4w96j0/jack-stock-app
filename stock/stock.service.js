const {finnhubService} = require('../services/index');

class StockService {
  constructor() {}

  async getCompanyBasic(symbol) {
    let res,
        data,
        values,
        isOpen;


    res = await finnhubService.getLatestPrice(symbol);
    values = res.data;
    isOpen = Math.floor(Date.now() / 1000) < values.t + 5 * 60;

    res = await finnhubService.getCompanyDetails(symbol);
    data = res.data;

    data.values = values;
    return data;
  }

  async getInsightsData(symbol) {
    
    let promises = [
      finnhubService.getEarning(symbol),
      finnhubService.getRecommendationTrends(symbol),
      finnhubService.getSocialSentients(symbol)
    ];

    let promisesResult = await Promise.all(promises);
    promisesResult = promisesResult.map(res => {
      return res.data
    });

    let [earnings, recommendation, social] = promisesResult;


    return {
      earnings,
      recommendation,
      social
    }
  }

  async searchCompany(company_name) {
    return finnhubService.searchCompany(company_name);
  }

  async getStockPriceInTwoYears(symbol) {
    const res = await finnhubService.getTwoYearsPrice(symbol);
    return res.data;
  }

  async getCompanyDetail(symbol) {
    let res, 
        data, 
        values, 
        peers,
        candlePrices,
        isOpen,
        promises,
        news,
        datas;

    res = await finnhubService.getLatestPrice(symbol);
    values = res.data;
    isOpen = Math.floor(Date.now() / 1000) < values.t + 5 * 60;

    res = await finnhubService.getCompanyDetails(symbol);
    data = res.data;

    promises = await Promise.all([ 
      finnhubService.getCompanyPeers(symbol),
      finnhubService.getSixHoursPrice(symbol, 5, isOpen, values.t),
      finnhubService.getCompanyNews(symbol)
    ]);
    datas = promises.map(promise => promise.data);
    peers = datas[0];
    candlePrices = datas[1];
    news = datas[2];


    data.values = values;
    data.peers = peers;
    data.isOpen = isOpen;
    data.candlePrices = candlePrices;
    data.news = news.slice(0, 20);
    return data;
  }
}

module.exports = new StockService();