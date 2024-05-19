package com.banksystem.banksystem.repository;

import com.banksystem.banksystem.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BankRepository extends JpaRepository<Bank, Integer> {
    Optional<Bank> findByBankName(String bankName);

    @Query("SELECT b FROM Bank b JOIN b.accountList a WHERE a.id = :accountId")
    List<Bank> findAllByAccountId(@Param("accountId") int accountId);

    @Query("SELECT b FROM Bank b WHERE b NOT IN (SELECT b FROM Bank b JOIN b.accountList a WHERE a.id = :accountId)")
    List<Bank> findAllBanksWithoutAccountId(@Param("accountId") int accountId);

}
