package com.banksystem.banksystem.repository;

import com.banksystem.banksystem.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query("SELECT t FROM Transaction t WHERE t.originatingId = :originatingId AND t.bankId = :bankId")
    List<Transaction> findAllByOriginatingIdAndBankId(@Param("originatingId") int originatingId,@Param("bankId") int bankId);

    @Query("SELECT t FROM Transaction t WHERE t.bankId = :bankId")
    List<Transaction> findAllByBankId(@Param("bankId")int bankId);
}
