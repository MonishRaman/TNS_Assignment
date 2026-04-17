package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Certificate;
import com.example.demo.repository.CertificateRepository;

@Service
public class CertificateService {

    @Autowired
    private CertificateRepository repo;

    public Certificate addCertificate(Certificate certificate) {
        return repo.save(certificate);
    }

    public Certificate getCertificate(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Certificate> getAllCertificates() {
        return repo.findAll();
    }

    public void deleteCertificate(Long id) {
        repo.deleteById(id);
    }
}