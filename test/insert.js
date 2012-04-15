var db = require("../lib/database")


describe("when I insert a document", function() {
  it("should be saved", function() {
    var things = db.collection("things")
    things.insert({name: "thing"})
    var coll = things.find({})
    coll[0].name.should.equal("thing")
  })
})
