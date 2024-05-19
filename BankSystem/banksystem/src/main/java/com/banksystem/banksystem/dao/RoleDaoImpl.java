package com.banksystem.banksystem.dao;

import com.banksystem.banksystem.entity.Roles;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

@Repository
public class RoleDaoImpl implements RoleDao {

	private EntityManager entityManager;

	public RoleDaoImpl(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}

	@Override
	public Roles findRoleByName(String theRoleName) {

		// retrieve/read from database using name
		TypedQuery<Roles> theQuery = entityManager.createQuery("from Roles where role=:roleName", Roles.class);
		theQuery.setParameter("roleName", theRoleName);
		
		Roles theRole;
		
		try {
			theRole = theQuery.getSingleResult();
		} catch (Exception e) {
			theRole = null;
		}
		
		return theRole;
	}

}
