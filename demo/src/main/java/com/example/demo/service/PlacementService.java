package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Placement;
import com.example.demo.repository.PlacementRepository;

@Service
public class PlacementService {

    @Autowired
    private PlacementRepository repo;

    public Placement addPlacement(Placement placement) {
        return repo.save(placement);
    }

    public Placement getPlacement(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Placement> getAllPlacements() {
        return repo.findAll();
    }

    public List<Placement> getByYear(int year) {
        return repo.findByYear(year);
    }

    public List<Placement> getByQualification(String qualification) {
        return repo.findByQualification(qualification);
    }

    public void deletePlacement(Long id) {
        repo.deleteById(id);
    }
}