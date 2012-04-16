var db = require("../lib/database")
  , ObjectId = require("../lib/object_id")

describe("when I insert a document", function() {
  it("should be saved", function() {
    var things = db.collection("things")

    things.insert({ name: "thing" })
    things.find({})[0].name.should.equal("thing")
  })
  it("should generate an ObjectId for the inserted document", function() {
    var things = db.collection("things")
      , id = things.insert({ name: "thing" }) 

    ;(id instanceof ObjectId).should.equal(true)
    id.toString().length.should.equal(24)
  })
})
