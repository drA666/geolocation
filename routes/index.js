const router = require('express').Router()

const devicescontroller = require("./devicescontroller")
const coordscontroller = require("./coordscontroller")

const { extend } = require("lodash")

router
 
 .post( "/coords", ( req, res ) => {
   res.send(coordscontroller.create(req.body))
 })
 
 .get( "/coords", ( req, res ) => {
   res.send(coordscontroller.read(req.query))
 })

 .get( "/coords/:id", ( req, res ) => {
   res.send(coordscontroller.read(req.params))
 })
 
 .put( "/coords", ( req, res ) => {
   res.send(coordscontroller.update( extend( {}, req.body, req.query )))
 })

 .put( "/coords/:id", ( req, res ) => {
   res.send(coordscontroller.update( extend( {}, req.body, req.query, req.params )))
 })

 .delete("/coords", ( req, res ) => {
   res.send(coordscontroller.delete( extend( {}, req.body, req.query )))
 })

 .delete("/coords/:id", ( req, res ) => {
   res.send(coordscontroller.delete( req.params ))
 })

 .post( "/devices", ( req, res ) => {
   res.send(devicescontroller.create(req.body))
 })
 
 .get( "/devices", ( req, res ) => {
   res.send(devicescontroller.read(req.query))
 })

 .get( "/devices/:id", ( req, res ) => {
   res.send(devicescontroller.read(req.params))
 })
 
 .put( "/devices", ( req, res ) => {
   res.send(devicescontroller.update( extend( {}, req.body, req.query )))
 })

 .put( "/devices/:id", ( req, res ) => {
   res.send(devicescontroller.update( extend( {}, req.body, req.query, req.params )))
 })

 .delete("/devices", ( req, res ) => {
   res.send(devicescontroller.delete( extend( {}, req.body, req.query )))
 })

 .delete("/devices/:id", ( req, res ) => {
   res.send(devicescontroller.delete( req.params ))
 })

module.exports = router 