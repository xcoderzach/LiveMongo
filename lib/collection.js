var collectionCache = require("./collection_cache")

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
 * @api public
 * @param document - the document to insert into the collection
 **/
Collection.prototype.insert = function(document) {
  this.cache.insert(document)
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
