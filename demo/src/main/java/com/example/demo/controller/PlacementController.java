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

import com.example.demo.model.Placement;
import com.example.demo.service.PlacementService;

@RestController
@RequestMapping("/placements")
public class PlacementController {

    @Autowired
    private PlacementService service;

    @PostMapping
    public Placement addPlacement(@RequestBody Placement placement) {
        return service.addPlacement(placement);
    }

    @GetMapping("/{id}")
    public Placement getPlacement(@PathVariable Long id) {
        return service.getPlacement(id);
    }

    @GetMapping
    public List<Placement> getAll() {
        return service.getAllPlacements();
    }

    @GetMapping("/year/{year}")
    public List<Placement> getByYear(@PathVariable int year) {
        return service.getByYear(year);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deletePlacement(id);
        return "Placement deleted";
    }
}