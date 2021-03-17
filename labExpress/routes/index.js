const { response } = require('express');
var express = require('express');
var router = express.Router();
const {plantillas} = require('./objetos')

router.get('/', function(req, res, next) {
  res.json(
    {Status: 200,
      plantillas});
});

router.get('/:id', function(req, res, next) {
  const item = plantillas.find(c=>c.id === parseInt(req.params.id))
  if(!item) res.json({Status: 404, Error: 'Not Found'})
  res.json(
    {Status: 200,
      item});
});

router.post('/', function(req, res, next) {

  if(!req.body.tag || !req.body.date || !req.body.capacidad) res.json({Status: 400, Error: 'Bad Request'});  
  
  const plantilla = {
    id : plantillas.length+1,
    tag: req.body.tag,
    date: req.body.date,
    capacidad: req.body.capacidad
  }
  plantillas.push(plantilla);
  res.json({Status: 201,
  Response: 'Agregado correctamente'});
});


router.put('/:id', function(req, res, next) {
  const item = plantillas.find(c=>c.id === parseInt(req.params.id))
  if(!item) res.json({Status: 404, Error: 'Not Found'})
  
  if(req.body.tag) item.tag = req.body.tag;
  if(req.body.date) item.date = req.body.date;
  res.json({Status: 204, item});

});

router.delete('/:id', function(req, res, next) {
  const item = plantillas.find(c=>c.id === parseInt(req.params.id))
  if(!item) res.json({Status: 404, Error: 'Not Found'})

  const index = plantillas.indexOf(item);
  plantillas.splice(index,1);
  res.json({Status: 204, Response: 'Eliminado correctamente'})
});

module.exports = router;
