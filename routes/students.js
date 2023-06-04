const express = require('express');
const router = express.Router();
const studentModel = require('../models/students');

router.get('/', async (req, res) => {
  try {
    const students = await studentModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const newStudent = new studentModel({
    name: req.body.name,
    enrolledDepartment: req.body.enrolledDepartment,
    enrolledDate: req.body.enrolledDate
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getStudent, (req, res) => {
  res.status(200).json(res.student);
});

router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.enrolledDepartment != null) {
    res.student.enrolledDepartment = req.body.enrolledDepartment;
  }
  if (req.body.enrolledDate != null) {
    res.student.enrolledDate = req.body.enrolledDate;
  }

  try {
    const updatedStudent = await res.student.save();
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.deleteOne();
    res.status(204).json({ message: 'Deleted user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getStudent(req, res, next) {
  try {
    const student = await studentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: `Cannot find user with id ${req.params.id}` });
    }
    res.student = student;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;