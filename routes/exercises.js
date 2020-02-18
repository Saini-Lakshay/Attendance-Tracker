const router = require('express').Router();
const user=require('../models/user.model')
const Exercise=require('../models/exercise.model')




router.route('/').get((req, res) => {
    //console.log(req.user);
    user.findOne({_id: req.user})
    .then(exercises =>{ 
        Exercise.find({_id : { $in : exercises.course}})
        .then(docs=>{
            res.json(docs);
        })
        .catch(err=>{
            console.log(err)
        })
    })
        //return res.json(exercises)})               //promise chaining..
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
     const courseName = req.body.courseName;
     const Attended = Number(req.body.Attended);
     const Delivered = Number(req.body.Delivered);
     const MinPer = Number(req.body.MinPer);

     const newExercise = new Exercise({
         courseName,
         Attended,
         Delivered,
         MinPer,
     });

     newExercise.save()
     .then((response) =>{ 
         console.log(response._id);
         user.updateOne({_id : req.user},{ $push : { course : response._id } })
         .then(u=>
            res.send('Exercise Added')
            )
     })
      //  return res.json('Exercise Added !!')}
     .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').post((req, res) => {
    Exercise.findByIdAndDelete(req.body.id)
    .then(() =>{
        user.updateOne({_id : req.user},{ $pull : { course :{ $in :  req.body.id} }})
        .then(u=>{
            res.send('Deleted')
        })
    })
    .catch(err => res.status(400).json('error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.courseName = req.body.courseName;
        exercise.Delivered = req.body.Delivered;
        exercise.Attended = req.body.Attended;
        exercise.MinPer = req.body.MinPer;

        exercise.save()
        .then(() => res.json('Exercise Updated .. !'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
});



module.exports = router;