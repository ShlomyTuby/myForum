var express = require('express');
var router = express.Router();
var Post = require('../model/Post');




/* GET posts. */
router.get('/posts', function(req, res, next) {
  Post.find(function(err,doc){
      if(err){
          return res.status(500).send({
              error: err,
              message: 'db error'
          });
      }
      return res.json(doc);
  });
});


/* GET posts. */
router.get('/posts/root', function(req, res, next) {
  Post.find({parentPostId: null},function(err,doc){
      if(err){
          return res.status(500).send({
              error: err,
              message: 'db error'
          });
      } else {
          Post.update({parentPostId: null},{'$inc': { 'viewersCount' : '1' }}, {multi: true},function(err,status){
              if(err){
                  console.error(err);
              } else {
                  console.log('inc viewersCount sucsessfuly');
              }
          });
      }
      return res.json(doc);
  });
});

/* GET posts. */
router.get('/posts/byParentPostId/:id', function(req, res, next) {
  var parentPostId = req.params.id;
  Post.find({'parentPostId': parentPostId},function(err,doc){
      if(err){
          return res.status(500).send({
              error: err,
              message: 'db error'
          });
      } else {
          Post.update({'parentPostId': parentPostId},{'$inc': { 'viewersCount' : '1' }}, {multi: true},function(err,status){
              if(err){
                  console.error(err);
              } else {
                  console.log('inc viewersCount sucsessfuly');
              }
          });
      }
      return res.json(doc);
  });
});

/* GET posts. */
router.get('/posts/:id', function(req, res, next) {
  var postId = req.params.id;
  Post.findById(postId,function(err,doc){
      if(err){
          return res.status(500).send({
              error: err,
              message: 'db error'
          });
      }
      if(!doc){
          return res.status(404).send({
              error: err,
              message: 'post not found'
          });
      } else {
          Post.update({_id: doc._id},{'$inc': { 'viewersCount' : '1' }},function(err,status){
              if(err){
                  console.error(err);
              } else {
                  console.log('inc viewersCount sucsessfuly');
              }
          });
      }
      return res.json(doc);
  });
});

/* POST posts. */
router.post('/posts', function(req, res, next) {
  
  var post = new Post(req.body);
  post.save(function(err,doc){
      if(err){
          return res.status(500).send({
              error: err,
              message: 'db error'
          });
      }
 
      if(doc.parentPostId){
          Post.update({_id: doc.parentPostId},{'$inc': { 'replayCount' : '1' }},function(err,status){
              if(err){
                  console.error(err);
              } else {
                  console.log('inc replayCount sucsessfuly');
              }
          });
      }

      return res.json(doc);
  });
  
});


/* PUT posts. */
router.put('/posts/:id', function(req, res, next) {
  
  var postId = req.params.id;
  Post.findById(postId,function(err,doc){
      if(err){
          return res.status(500).send({
              error: err,
              message: 'db error'
          });
      }
      if(!doc){
          return res.status(404).send({
              error: err,
              message: 'db error, post not found'
          });
      }
      if(req.body){
            doc.header = req.body.header;
            doc.text = req.body.text;
            doc.author = req.body.author;
            doc.save(function(err,doc){
                    if(err){
                        return res.status(500).send({
                            error: err,
                            message: 'db error'
                        });
                    }
                    return res.json(doc);
            });
      };
  });
  
});


  
/* DELETE posts. */
router.delete('/posts/:id', function(req, res, next) {
  
  var postId = req.params.id;
  Post.findById(postId,function(err,doc){
      if(err){
          return res.status(500).send({
              error: err,
              message: 'db error'
          });
      }
      if(!doc){
          return res.status(404).send({
              error: err,
              message: 'db error, post not found'
          });
      }
      doc.remove(function(err){
            if(err){
                return res.status(500).send({
                    error: err,
                    message: 'db error'
                });
            }

            
            if(doc.parentPostId){
                Post.update({_id: doc.parentPostId,  replayCount : { $gte: 0}},{'$inc': { 'replayCount' : '-1' }},function(err,status){
                    if(err){
                        console.error(err);
                    } else {
                        console.log('inc replayCount sucsessfuly');
                    }
                });
            }


            return res.send({
                message : 'post was deleted',
                status: 'success'
            });
      });
  });
  
});


module.exports = router;
