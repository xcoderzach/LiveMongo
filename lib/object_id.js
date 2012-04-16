 /**
  * machineId and pid and timestamp should be generated on the server
  * and sent on a per connection basis, that way each connection can
  * create like 16 million objects, also that prevents object generation
  * abuse.
  **/

var machineId = Math.ceil(Math.random()*10000000).toString(16).slice(0, 6)
  , pid = Math.ceil(Math.random()*10000000).toString(16).slice(0, 4)
  , increment = 0

/**
 * The ObjectId constructor creates a new object id from the hex string
 * `id` if `id` is provided, otherwise it generates a new object id
 */
function ObjectId(id) {
  if(typeof id === "string" && id.match(/^[0-9a-f]{24}$/i)) {
    this.id = id
  } else if(typeof id === "undefined") {
    this.id = generateObjectId()
  } else {
    throw new Error("Only hex string ids are supported")
  }
}
/**
 * Returns the hex string of this ObjectId
 **/
ObjectId.prototype.toString = function() {
  return this.id
}
/**
 * Generates an object id based roughly on the BSON objectId spec
 * this method will change in the future once part of the id
 * is generated on the server.
 **/
function generateObjectId() {
  var t = Math.floor((new Date).getTime() / 1000).toString(16)
    , m = machineId
    , p = pid
    , i = increment.toString(16)

  if(increment > 0xffffff) {
    increment = 0
  } else {
    increment++
  }

  return '00000000'.substr(0, 8 - t.length) + t +
         '000000'.substr(0, 6 - m.length) + m +
         '0000'.substr(0, 4 - p.length) + p +
         '000000'.substr(0, 6 - i.length) + i
}

module.exports = ObjectId
