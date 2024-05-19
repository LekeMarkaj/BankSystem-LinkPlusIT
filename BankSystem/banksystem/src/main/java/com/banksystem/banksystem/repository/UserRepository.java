package com.banksystem.banksystem.repository;

import com.banksystem.banksystem.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByEmail(String email);
}
