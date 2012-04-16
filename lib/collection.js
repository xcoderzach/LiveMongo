var collectionCache = require("./collection_cache")
  , ObjectId        = require("./object_id")

function Collection(name) {
  this.name = name
  this.cache = collectionCache(name)
}
/**
 * Insert inserts a document into the database.
 *
 * The document will be instantly added to the client side cache
 * and will be persisted later, if you need to know the status
 * of the document you can use the ________ methods.
 *
 * The insert method adds an _id ObjectId to the document
 * if no ObjectId is given.
 *
 * @api public
 * @param document - the document to insert into the collection
 * @return returns the _id of the document inserted
 **/
Collection.prototype.insert = function(document) {
  var id
  if(typeof document !== "object") {
    throw new Error("Document to insert is not an object, but is: " + document)
  }
  if(typeof document._id === "undefined") {
    id = document._id = new ObjectId()
  } else {
    id = document._id
  }
  this.cache.insert(document)
  return id
}

/**
 * Finds documents in the database
 *
 * instantly returns the documents that match this query
 * in the cache. 
 *
 * @api public
 * @param query - the query to find documents with 
 * @return an array of documents that match query
 **/ 
Collection.prototype.find = function(query) {
  return this.cache.find(query)
}

module.exports = Collection
