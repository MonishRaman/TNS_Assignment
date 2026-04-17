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

import com.example.demo.model.Certificate;
import com.example.demo.service.CertificateService;

@RestController
@RequestMapping("/certificates")
public class CertificateController {

    @Autowired
    private CertificateService service;

    @PostMapping
    public Certificate add(@RequestBody Certificate certificate) {
        return service.addCertificate(certificate);
    }

    @GetMapping("/{id}")
    public Certificate get(@PathVariable Long id) {
        return service.getCertificate(id);
    }

    @GetMapping
    public List<Certificate> getAll() {
        return service.getAllCertificates();
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteCertificate(id);
        return "Certificate deleted";
    }
}