package com.banksystem.banksystem.repository;

import com.banksystem.banksystem.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Roles,Integer> {
}
