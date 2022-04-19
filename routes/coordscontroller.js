const coords = require("../models/coords")
const { findIndex, last, isUndefined } = require("lodash")
const { v4 } = require("uuid")


let _read = options => ( options && !isUndefined( options.devid ) ) ? coords.filter(p => p.devid == options.id)[0] : coords


let _create = options => {
  coords.push( options )
  last( coords ).devid = options.id
  return last( coords )
}

let _delete = options => {
  let result 
  let index = findIndex( coords, p => p.devid == options.id )
  while ( index >= 0 ) {
    result = coords.splice( index, 1 )
	index = findIndex( coords, p => p.devid == options.id )
  }
  return result
}


module.exports = {
  create: _create,
  read: _read,
  delete: _delete
} 
