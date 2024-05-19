package com.banksystem.banksystem.service;

import com.banksystem.banksystem.dtos.*;
import com.banksystem.banksystem.entity.Bank;
import com.banksystem.banksystem.entity.Transaction;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Collection;
import java.util.List;

public interface UserService extends UserDetailsService {
    UserDetails loadUserByUsername(String email);

    UserDto login(UserDto credentialsDto);

    void register(UserDto user);

    UserDto findByLogin(String subject, String token);

    void createBank(BankDto bankDto);

    double withdraw(WithdrawalDto withdrawalDto);

    double deposit(DepositDto depositDto);

    Collection<Bank> findAllBanksWithoutAccountId(int id);

    void chooseBank(ChooseBankDto chooseBankDto);

    Collection<Bank> findAllByAccountId(int id);

    UserDto findAccountInBank(ChooseBankDto chooseBankDto);

    double depositToSomeone(DepositDto depositDto);

    Collection<Transaction> findAllTransactionsByAccountId(ChooseBankDto chooseBankDto);

    List<BankAccountDto> findAllBankAccounts();
}
