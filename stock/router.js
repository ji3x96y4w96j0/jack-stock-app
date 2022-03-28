const express = require("express");
const stockController = require("./stock.controller");

const router = express.Router();


router.get('/company/:company_name', stockController.searchCompany);
router.get('/company/details/:symbol', stockController.getCompanyDetails);
router.get('/company/two-years-prices/:symbol', stockController.getTwoYearsPrices)
router.get('/company/insights/:symbol', stockController.getInsightsData);
router.get("/company/info/:symbol", stockController.getCompanyBasicInfo);

module.exports = router;