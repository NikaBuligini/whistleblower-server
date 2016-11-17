'use strict'

const Project = require('../schemas/project');
const Service = require('../schemas/service');

module.exports = {
  list (req, res) {
    res.render('./pages/projects', {
      title: 'Projects'
    })
  },

  showSingleProject (req, res) {
    res.render('./pages/projects', {
      title: req.params.projectName
    })
  },

  getAll (req, res) {
    Project.getAll()
      .then(projects => {
        return res.json(projects);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  },

  get (req, res) {
    Project.getByName(req.params.projectName)
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

    Project.getByName(name)
      .then((existingProject) => {
        if (existingProject) {
          return res.status(500).json({message: `${name} is already used!`});
        }

        let project = new Project({ name });
        project.save();

        res.json(project);
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
