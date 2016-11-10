'use strict'

const Project = require('../schemas/project');
const Service = require('../schemas/service');

module.exports = {
  list (req, res) {
    Project.getFirstProject()
      .then(project => {
        console.log(project);
      })

    res.render('./pages/projects', {
      title: 'Projects'
    })
  },

  listAll (req, res) {
    Project.getAll()
      .then(projects => {
        console.log(projects);
        return res.json(projects);
      })
  }
}
