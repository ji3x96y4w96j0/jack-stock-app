const axios = require("axios");

function extendNumber(n) {
  return n < 10 ? '0' + n : n;
}

class Finnhub {
  constructor() {}

  async searchCompany(company_name) {
    return axios.get(`https://finnhub.io/api/v1/search?q=${company_name}&token=${process.env.FINNHUB_TOKEN}`)
  }

  async getCompanyDetails(symbol) {
    return axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_TOKEN}`);
  }

  async getLatestPrice(symbol) {
    return axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_TOKEN}`);
  }

  async getCompanyPeers(symbol) {
    return axios.get(`https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=${process.env.FINNHUB_TOKEN}`);
  }

  async getTwoYearsPrice(symbol) {
    let from, to;
    to = Math.floor(Date.now() / 1000);
    from = to - 60 * 60 * 24 * 365 * 2;
    return axios.get(`https://finnhub.io/api/v1/stock/candle?token=${process.env.FINNHUB_TOKEN}&symbol=${symbol}&resolution=D&from=${from}&to=${to}`)
  }

  async getSixHoursPrice(symbol, resolution, isOpen, timestamp) {
    let from, to;
    if (isOpen) {
      to = Math.floor(Date.now() / 1000);
    } else {
      to = timestamp + 5 * 60;
    }
    from = to - 60 * 60 * 6;
    return axios.get(`https://finnhub.io/api/v1/stock/candle?token=${process.env.FINNHUB_TOKEN}&symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`)
  }

  async getCompanyNews(symbol) {
    let toDate = new Date();
    let fromDate = new Date(toDate.getTime() - 1000 * 60 * 60 * 24 * 7);
    let fromDay = `${fromDate.getFullYear()}-${extendNumber(fromDate.getMonth() + 1)}-${extendNumber(fromDate.getDate())}`;
    let toDay = `${toDate.getFullYear()}-${extendNumber(toDate.getMonth() + 1)}-${extendNumber(toDate.getDate())}`;
    const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${fromDay}&to=${toDay}&token=${process.env.FINNHUB_TOKEN}`;
   
    return axios.get(url);
  }

  async getSocialSentients(symbol) {
    return axios.get(`https://finnhub.io/api/v1/stock/social-sentiment?symbol=${symbol}&token=${process.env.FINNHUB_TOKEN}`)
  }

  async getRecommendationTrends(symbol) {
    return axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${process.env.FINNHUB_TOKEN}`);
  }

  async getEarning(symbol) {
    return axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${process.env.FINNHUB_TOKEN}`)
  }
}

module.exports = new Finnhub();