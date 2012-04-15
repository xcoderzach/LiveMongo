var QueryMatcher = require("./query_matcher")
/**
 * A map of collectionCaches by collectionName
 *
 * cache["users"]: CollectionCache("users") 
 */
cache = {}

/**
 * CollectionCache caches all of the documents that we've 
 * seen, we want to be sure that we can get documents that
 * we've created instantly, and we also want to be able to
 * instantly find any documents that we've already found
 * in another query.
 *
 * @api public
 **/
function CollectionCache(collectionName) {
  this.collectionName = collectionName
  this.documents = []
}

/** 
 * inserts a document into the client cache of documents
 **/
CollectionCache.prototype.insert = function(document) {
  this.documents.push(document)
}

CollectionCache.prototype.find = function(query) {
  // TODO this will eventually need to be a cursor
  var docs = []
  for(var i = 0 ; i < this.documents.length ; i++) {
    if(QueryMatcher.match(this.documents[i], query)) {
      docs.push(this.documents[i])
    }
  }
  return docs
}

/**
 * Call this function to get a collection cache
 * for a give collection name.
 **/
module.exports = function(collectionName) {
  if(cache[collectionName]) {
    return cache[collectionName]
  }
  return new CollectionCache(collectionName)
}
