package com.banksystem.banksystem.dao;

import com.banksystem.banksystem.entity.Account;

public interface UserDao {

    Account findByEmailDAO(String theEmail);
    
}
