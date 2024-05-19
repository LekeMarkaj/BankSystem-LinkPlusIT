package com.banksystem.banksystem.dtos;

import com.banksystem.banksystem.entity.Roles;

import java.util.Collection;

public class UserDto {

    private int id;
    private String name;
    private double balance;
    private Collection<Roles> roles;
    private String email;
    private String password;
    private String token;

    public UserDto() {}

    public UserDto(int id, String name, double balance, Collection<Roles> roles, String email, String password, String token) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.roles = roles;
        this.email = email;
        this.password = password;
        this.token = token;
    }

    @Override
    public String toString(){
        return email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public Collection<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Roles> roles) {
        this.roles = roles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
