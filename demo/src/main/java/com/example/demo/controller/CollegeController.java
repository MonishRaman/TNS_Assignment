package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.College;
import com.example.demo.service.CollegeService;

@RestController
@RequestMapping("/colleges")
public class CollegeController {

    @Autowired
    private CollegeService service;

    @PostMapping
    public College addCollege(@RequestBody College college) {
        return service.addCollege(college);
    }

    @GetMapping("/{id}")
    public College getCollege(@PathVariable Long id) {
        return service.getCollege(id);
    }

    @GetMapping
    public List<College> getAll() {
        return service.getAllColleges();
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteCollege(id);
        return "College deleted";
    }
}