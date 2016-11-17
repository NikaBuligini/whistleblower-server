'use strict'

const Project = require('../schemas/project');
const Service = require('../schemas/service');

module.exports = {
  activate (req, res) {
    const { serviceId } = req.params;

    Service.getById(serviceId)
      .then((service) => {
        if (!service) {
          return res.status(500).json({message: `service doesn't exists!`});
        }

        service.is_active = req.body.isActive;
        service.save();

        res.json(service);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
}
