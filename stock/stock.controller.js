const stockService = require("./stock.service");

const companyDetails = new Map();
const companyBasicInfo = new Map();
const InsightsData = new Map();
const TwoYearsPrices = new Map();

class StockController {
  constructor() {}

  async searchCompany(req, res) {
    try {
      const company_name = req.params.company_name;
      const httpRes = await stockService.searchCompany(company_name.toUpperCase());
      res.status(200).json(httpRes.data);
    } catch(err) {
      res.status(500).send(err);
    }
  }

  async getTwoYearsPrices(req, res) {
    try {
      const {symbol} = req.params;
      if (TwoYearsPrices.has(symbol)) {
        res.status(200).json(TwoYearsPrices.get(symbol));
        return;
      }
      const data = await stockService.getStockPriceInTwoYears(symbol);
      TwoYearsPrices.set(symbol, data);
      setTimeout(() => {
        TwoYearsPrices.delete(symbol);
      }, 15000);
      res.status(200).json(data);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async getCompanyBasicInfo(req, res) {
    try {
      let {symbol} = req.params;
      symbol = symbol.toUpperCase();
      if (companyBasicInfo.has(symbol)) {
        return res.status(200).json(companyBasicInfo.get(symbol));
      }
      const data = await stockService.getCompanyBasic(symbol);
      if (data) {
        companyBasicInfo.set(symbol, data);
        setTimeout(() => {
          companyBasicInfo.delete(symbol);
        }, 15000);
      }
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  async getCompanyDetails(req, res) {
    try {
       let {symbol} = req.params;
       symbol = symbol.toUpperCase();
       if (companyDetails.has(symbol)) {
         res.status(200).json(companyDetails.get(symbol));
         return;
       }
       const data = await stockService.getCompanyDetail(symbol);
       if ('name' in data) {
        companyDetails.set(symbol, data);
        setTimeout(() => {
          companyDetails.delete(symbol);
        }, 15000);
       }
       res.status(200).json(data);
    } catch(err) {
      console.log(err)
      res.status(500).send(err);
    }
  }

  async getInsightsData(req, res) {
    try {
      const {symbol} = req.params;
      if (InsightsData.has(symbol)) {
        res.status(200).json(InsightsData.get(symbol));
        return;
      }
      const data = await stockService.getInsightsData(symbol);
      InsightsData.set(symbol, data);
      setTimeout(() => {
        InsightsData.delete(symbol);
      }, 15000);
      res.status(200).json(data);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = new StockController();