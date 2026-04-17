package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // Register user
    public User register(User user) {
        return repo.save(user);
    }

    // Login check
    public String login(String name, String password) {
        User user = repo.findByName(name);

        if (user != null && user.getPassword().equals(password)) {
            return "Login Successful";
        }
        return "Invalid Credentials";
    }
}