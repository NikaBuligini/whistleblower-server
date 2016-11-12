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
        // console.log(projects);
        return res.json(projects);
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

  clear (req, res) {
    Project.remove({}).exec();
    res.send('Done');
  }
}
