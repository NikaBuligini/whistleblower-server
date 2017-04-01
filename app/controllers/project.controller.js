import Project from '../schemas/project';
import User from '../schemas/user';
import '../schemas/service';

export function list(req, res) {
  res.render('./pages/projects', {
    title: 'Projects',
    user: req.user,
  });
}

export function showSingleProject(req, res) {
  res.render('./pages/projects', {
    title: req.params.projectName,
    user: req.user,
  });
}

export function getAll(req, res) {
  const { id } = req.body;
  if (typeof id !== 'undefined') {
    Project.findById(id)
      .exec()
      .then(project => res.json(project));
  } else {
    Project.getAll()
      .then(projects => res.json(projects))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
}

export function get(req, res) {
  Project.getByName(req.params.projectName)
    .then(project => res.json(project))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function create(req, res) {
  const name = req.body.projectName;

  Project.getByName(name)
    .then((existingProject) => {
      if (existingProject) {
        return res.status(500).json({ message: `${name} is already used!` });
      }

      const project = new Project({ name });
      project.save();

      return res.json(project);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function addPermission(req, res) {
  let project;
  Project.getById(req.params.projectId)
    .then((existingProject) => {
      if (!existingProject) return res.status(500).json({ message: 'Project doesn\'t exists!' });
      project = existingProject;
      return User.getById(req.body.userId);
    })
    .then((user) => {
      if (!user) return res.status(500).json({ message: 'Invalid user!' });
      project.addPermission(user);
      return res.json(project);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function removePermission(req, res) {
  Project.findById(req.params.projectId)
    .exec()
    .then((project) => {
      if (!project) return res.status(500).json({ message: 'Project doesn\'t exists!' });
      project.removePermission(req.body.userId);
      return Project.getById(req.params.projectId);
    })
    .then(project => res.json(project))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function getProjectsForUser(req, res) {
  Project.getByUserId(req.user.id)
    .then(projects => res.json(projects))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function clear(req, res) {
  Project.remove({}).exec();
  res.send('Done');
}
