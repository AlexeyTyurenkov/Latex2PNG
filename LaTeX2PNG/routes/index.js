var express = require('express');
var router = express.Router();
// a simple TeX-input example
var mjAPI = require("../node_modules/MathJax-node/lib/mj-single.js");
mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  }
});
mjAPI.start();

/* GET home page. */
router.get('/', function(req, res, next) {
    
  res.render('index', { title: 'Express' });
});

router.get('/latex', function(req, res, next){
  var tex = decodeURIComponent(req.query.tex);
  mjAPI.typeset({
            math: tex,
            format: "TeX", // "inline-TeX", "MathML"
            png:true, //  svg:true, 
    }, function (data) {
        res.header('Content-Type', 'image/png');
        res.status(200).send(new Buffer(data.png.slice(22),'base64'));
    }); 
}
);


router.get('/png', function(req, res, next) {
    var id  = req.query.id
    var tex = req.query.tex
    mjAPI.typeset({
            math: tex,
            format: "TeX", // "inline-TeX", "MathML"
            png:true, //  svg:true, 
    }, function (data) {
        res.header('Content-Type', 'image/png');
        res.status(200).send(new Buffer(data.png.slice(22),'base64'));
    });
});


module.exports = router;
