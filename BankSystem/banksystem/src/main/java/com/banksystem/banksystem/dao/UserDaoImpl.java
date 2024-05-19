package com.banksystem.banksystem.dao;

import com.banksystem.banksystem.entity.Account;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {

	private EntityManager entityManager;

	public UserDaoImpl(EntityManager theEntityManager) {
		this.entityManager = theEntityManager;
	}

	@Override
	public Account findByEmailDAO(String theEmail) {

		// retrieve/read from database using email
		TypedQuery<Account> theQuery = entityManager.createQuery("from Account where email=:email", Account.class);
		theQuery.setParameter("email", theEmail);

		Account theUser;
		try {
			theUser = theQuery.getSingleResult();
		} catch (Exception e) {
			theUser = null;
		}

		return theUser;
	}



}
