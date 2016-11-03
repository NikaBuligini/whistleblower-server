'use strict'

const express = require('express');
const router = express.Router();
require('express-session');

const home = require('./app/controllers/home.controller');

router.get('/', home.homepage);

module.exports = router
