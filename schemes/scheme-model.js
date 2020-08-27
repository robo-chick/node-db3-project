const db = require("../data/db-config")

function find() {
    return db("schemes")
}

function findById(id) {
    return db("schemes")
        .where({id})
        .first()
}

function findSteps(id) {
    return db("schemes as s")
        .join("steps as st", "s.id", "st.scheme_id")
        .select("s.id", "s.scheme_name", "st.step_number", "st.instructions")
        .where({scheme_id: id})
        .orderBy("st.step_number")
}

function add(schemeData) {
    return db("schemes")
        .insert(schemeData)
}

function update(changes, id) {
    return db("schemes")
        .where({id})
        .update(changes)
}

function remove(id) {
    return db("schemes")
        .where({id})
        .del()
}

// STRETCH Add the following method to your API
// addStep(step, scheme_id): This method expects a step object and a scheme id. It inserts the new step into the database, correctly linking it to the intended scheme.

function addStep(step, schemeId) {
    return db("steps")
            .where({scheme_id: schemeId})
            .insert(step)
            .then(() => {
              return step;
            })
  }
module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
}