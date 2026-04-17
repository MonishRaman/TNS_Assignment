package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    // Add student
    public Student addStudent(Student student) {
        return repo.save(student);
    }

    // Get by ID
    public Student getStudent(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    // Search by hall ticket
    public Student getByHallTicket(Long hallTicket) {
        return repo.findByHallTicketNo(hallTicket);
    }

    // Search by name
    public List<Student> getByName(String name) {
        return repo.findByName(name);
    }

    // Delete student
    public void deleteStudent(Long id) {
        repo.deleteById(id);
    }
}