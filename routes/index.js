'use strict'

const express = require('express');
const projectCtrl = require('../controllers/project');
const api = express.Router();

// Project Data Managment
api.get('/project', projectCtrl.getProjects);
api.get('/project/:projectId', projectCtrl.getProject);
api.post('/project', projectCtrl.saveProject);
api.put('/project/:projectId', projectCtrl.updateProject);
api.delete('/project/:projectId', projectCtrl.deleteProject);


module.exports = api;