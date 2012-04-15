var Collection = require("./collection")
module.exports = {
  collection: function(name) {
    return new Collection(name)
  }
}
