const Tutorial = require("../models/tutorial");

const TutorialController = {
  create(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    Tutorial.create(req.body, (err, data) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      }
      return res.send(data);
    });
  },

  findAll(req, res) {
    const title = req.query.title;

    Tutorial.getAll(title, (err, data) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      }
      return res.send(data);
    });
  },

  findAllPublished(req, res) {
    Tutorial.getAllPublished((err, data) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      }
      return res.send(data);
    });
  },

  findOne(req, res) {
    const id = req.params.id;
    Tutorial.findById(id, (err, data) => {
      if (err?.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Tutorial with id ${id}.`,
        });
      }
      if (err) {
        res.status(500).send({
          message: `Error retrieving Tutorial with id ${id}`,
        });
      }
      return res.send(data);
    });
  },

  update(req, res) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const id = req.params.id;

    Tutorial.updateById(id, req.body, (err, data) => {
      if (err?.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Tutorial with id ${id}.`,
        });
      }
      if (err) {
        return res.status(500).send({
          message: `Error updating Tutorial with id ${id}`,
        });
      }
      return res.send(data);
    });
  },

  delete(req, res) {
    const id = req.params.id;
    Tutorial.remove(id, (err, data) => {
      if (err?.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Tutorial with id ${id}.`,
        });
      }
      if (err) {
        return res.status(500).send({
          message: `Could not delete Tutorial with id ${id}`,
        });
      }
      return res.send({ message: `Tutorial was deleted successfully!` });
    });
  },

  deleteAll(req, res) {
    Tutorial.removeAll((err, data) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials.",
        });
      }
      return res.send({ message: `All Tutorials were deleted successfully!` });
    });
  },
};

module.exports = TutorialController;
