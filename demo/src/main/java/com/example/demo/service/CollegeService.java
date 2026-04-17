package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.College;
import com.example.demo.repository.CollegeRepository;

@Service
public class CollegeService {

    @Autowired
    private CollegeRepository repo;

    public College addCollege(College college) {
        return repo.save(college);
    }

    public College getCollege(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<College> getAllColleges() {
        return repo.findAll();
    }

    public void deleteCollege(Long id) {
        repo.deleteById(id);
    }
}