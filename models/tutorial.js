const sql = require("./db");

const Tutorial = {
  create({ title, description, published = false }, callback) {
    const payload = { title, description, published };
    sql.query("INSERT INTO tutorials SET ?", payload, (err, res) => {
      if (err) {
        console.log(`error: ${err}`);
        callback(err, null);
        return;
      }
      const result = { id: res.insertId, ...payload };
      console.log("Created tutorial: ", result);
      callback(null, result);
    });
  },

  findById(id, callback) {
    sql.format;
    sql.query("SELECT * FROM tutorials WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log(`error: ${err}`);
        callback(err, null);
        return;
      }

      if (res?.length) {
        console.log("found tutorial", res[0]);
        callback(null, res[0]);
        return;
      }

      console.log(`Not Found id :${id}`);
      callback({ kind: "not_found" }, null);
    });
  },

  getAll(title, callback) {
    let query = "SELECT * FROM tutorials";

    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log(`error: ${err}`);
        callback(null, err);
        return;
      }

      console.log("tutorials: ", res);
      callback(null, res);
    });
  },

  getAllPublished(callback) {
    sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
      if (err) {
        console.log(`error: ${err}`);
        callback(null, err);
        return;
      }
      console.log("tutorials: ", res);
      callback(null, res);
    });
  },

  updateById(id, { title, description, published }, callback) {
    sql.query(
      "UPDATE tutorials SET title=?, description=?, published=? WHERE id=?",
      [title, description, published, id],
      (err, res) => {
        if (err) {
          console.log(`error: ${err}`);
          callback(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          callback({ kind: "not_found" }, null);
          return;
        }

        const result = { id, title, description, published };
        console.log("updated tutorial: ", result);
        callback(null, result);
      }
    );
  },

  remove(id, callback) {
    sql.query("DELETE FROM tutorials WHERE id=?", id, (err, res) => {
      if (err) {
        console.log(`error: ${err}`);
        callback(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted tutorial with id: ", id);
      callback(null, res);
    });
  },

  removeAll(callback) {
    sql.query("DELETE FROM tutorials", (err, res) => {
      if (err) {
        console.log(`error: ${err}`);
        callback(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} tutorials`);
      callback(null, res);
    });
  },
};

module.exports = Tutorial;
