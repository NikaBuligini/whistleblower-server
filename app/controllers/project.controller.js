'use strict'

const Project = require('../schemas/project');
const Service = require('../schemas/service');

module.exports = {
  list (req, res) {
    res.render('./pages/projects', {
      title: 'Projects'
    })
  },

  listAll (req, res) {
    Project.getAll()
      .then(projects => {
        return res.json(projects);
      })
  },

  getSingle (req, res) {
    Project.getProjectByName(req.params.projectName)
      .then((project) => {
        res.json(project);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  },

  create (req, res) {
    let name = req.body.projectName;

    Project.getProjectByName(name)
      .then((existingProject) => {
        if (existingProject) {
          return res.status(500).json({message: `${name} is already used!`});
        }

        let project = new Project({
          name: name
        });
        project.save();

        res.json(true);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  },

  getServicesForProject (req, res) {
    Project.getProjectServices(req.params.projectName)
      .then((project) => {
        res.json(project.services);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  },

  clear (req, res) {
    Project.remove({}).exec();
    res.send('Done');
  }
}
