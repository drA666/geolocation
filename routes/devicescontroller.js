const devices = require("../models/devices")
const { findIndex, last, isUndefined } = require("lodash")
const { v4 } = require("uuid")


let _read = options => ( options && !isUndefined( options.id ) ) ? devices.filter(p => p.id == options.id)[0] : devices

let _update = options  => {
  let result 
  let index = findIndex( devices, p => p.id == options.id )
  if ( index >= 0 ) {
    devices[index] = options
    result = devices[index]
  }

  return result
}

let _create = options => {
  options.id = v4()
  devices.push( options )
  return last( devices )
}

let _delete = options => {
  let result 
  let index = findIndex( devices, p => p.id == options.id )
  if ( index >= 0 ) {
    result = devices.splice( index, 1 )
  }
  return result
}


module.exports = {
  create: _create,
  read: _read,
  update: _update,
  delete: _delete
} 
