package com.banksystem.banksystem.dao;

import com.banksystem.banksystem.entity.Roles;

public interface RoleDao {

	Roles findRoleByName(String theRoleName);

}
