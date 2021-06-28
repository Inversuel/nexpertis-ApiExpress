const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require("./models/task");

router.get('/all', (req, res, next) => {
  Task.find()
    .then((result) => {
      res.status(200).json({
        result
      });
    })
    .catch((error) => {
      res.status(500).json({
        wiadomość: 'Błąd przy wyświetleniu zadań',
        info: result,
      });
    });
});
  
router.post('/add', (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    User: req.body.User,
    AssignedUser: req.body.AssignedUser,
    Title: req.body.Title,
    Describe: req.body.Describe,
    StartDate: Date.now(),
    EndDate: req.body.EndDate,
  })
  task.save().then(result => {
    res.status(201).json({
      wiadomość: 'Dodano nowe zadanie',
      informacja: result,
    });
  }).catch(error => {
    res.status(500).json({
      wiadomość: 'Nie udało się dodać zadania',
      informacja: error,
    })
  })

});

router.get("/id/:taskid", (req, res, next) => {
  const id = req.params.taskid;
  Task.findById(id)
    .then(result =>
      res.status(200).json({
        wiadomość: `Szczegóły zadania o id ` + id,
        info: result,
      })
    ).catch(error => {
      res.status(500).json({
        wiadomość: `Nie udało się znależć zadania o id ` + id,
        informacja: error,
      })
    })
});

router.patch("/re/:taskid", (req, res, next) => {
  const id = req.params.taskid;
  Task.findByIdAndUpdate(id, {
    User: req.body.User,
    AssignedUser: req.body.AssignedUser,
    Title: req.body.Title,
    Describe: req.body.Describe,
    EndDate: req.body.EndDate,
  }, { new: true })
    .then(result => {
      res.status(200).json({
        wiadomość: 'Zmiana danych zadania o id ' + id,
        info: result,
      })
    }).catch(error => {
      res.status(500).json({
        wiadomość: 'Błąd przy edytcji zadania o id ' + id,
        info: error,
      })
    })
});


router.delete("/id/remove/:taskid", (req, res, next) => {
  const id = req.params.taskid;
  Task.findOneAndDelete(id)
    .then(result => {
      res.status(200).json({
        wiadomość: 'usuniecie zadania o  numerze' + id,
      })
    }).catch(error => {
      res.status(500).json({
        wiadomość: 'Nie udało się usunąć zadania',
        info: error,
      })
    })
});

module.exports = router;