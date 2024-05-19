package com.banksystem.banksystem.controller;

import com.banksystem.banksystem.config.UserAuthenticationProvider;
import com.banksystem.banksystem.dtos.*;
import com.banksystem.banksystem.entity.Bank;
import com.banksystem.banksystem.entity.CustomUserDetails;
import com.banksystem.banksystem.entity.Transaction;
import com.banksystem.banksystem.repository.UserRepository;
import com.banksystem.banksystem.service.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    private final UserServiceImpl userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public AuthController(UserServiceImpl userService,UserAuthenticationProvider userAuthenticationProvider) {
        this.userService = userService;
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    public BankDto convertToBankDto(Bank bank) {
        BankDto bankDto = new BankDto();
        bankDto.setId(bank.getId());
        bankDto.setBankName(bank.getBankName());

        return bankDto;
    }

    public TransactionDto convertToTransactionDto(Transaction transaction) {
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setTransactionId(transaction.getId());
        transactionDto.setTransactionReason(transaction.getTransactionReason());
        transactionDto.setOriginatingId(transaction.getOriginatingId());
        transactionDto.setResultingId(transaction.getResultingId());
        transactionDto.setBankId(transaction.getBankId());
        transactionDto.setAmount(transaction.getAmount());

        return transactionDto;
    }

//    public BankAccountDto convertToBankAccountDto(Transaction transaction) {
//        TransactionDto transactionDto = new TransactionDto();
//        transactionDto.setTransactionId(transaction.getId());
//        transactionDto.setTransactionReason(transaction.getTransactionReason());
//        transactionDto.setOriginatingId(transaction.getOriginatingId());
//        transactionDto.setResultingId(transaction.getResultingId());
//        transactionDto.setBankId(transaction.getBankId());
//        transactionDto.setAmount(transaction.getAmount());
//
//        return transactionDto;
//    }



    @PostMapping("/auth/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid UserDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getEmail()));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/auth/register")
    public void register(@RequestBody @Valid UserDto user) {
       userService.register(user);
    }

    @GetMapping("/auth/userinfo")
    public ResponseEntity<?> getUserInfo(Principal principal){
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(principal.getName());

        UserDto userInfo = new UserDto();
        userInfo.setId(userDetails.getId());
        userInfo.setEmail(userDetails.getUsername());
        userInfo.setName(userDetails.getName());
        userInfo.setRoles(userDetails.getRoles());
        userInfo.setPassword(userDetails.getPassword());

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/auth/createBank")
    public void createBank(@RequestBody @Valid BankDto bankDto) {
       userService.createBank(bankDto);
    }

    @PostMapping("/auth/withdraw")
    public ResponseEntity<?> withdraw(@RequestBody @Valid WithdrawalDto withdrawalDto) {
        double withdrawal = userService.withdraw(withdrawalDto);

        WithdrawalDto withdrawalDto1 = new WithdrawalDto();
        withdrawalDto1.setWithdrawalAmount(withdrawal);

        return ResponseEntity.ok(withdrawalDto1);
    }

    @PostMapping("/auth/deposit")
    public ResponseEntity<?> deposit(@RequestBody @Valid DepositDto depositDto) {
        double deposit = userService.deposit(depositDto);

        DepositDto depositDto1 = new DepositDto();
        depositDto1.setDepositAmount(deposit);

        return ResponseEntity.ok(depositDto1);
    }

    @PostMapping("/auth/fetchAllBanks")
    public ResponseEntity<?> fetchAllBanks(@RequestBody @Valid UserDto userDto) {
        List<BankDto> bankList = userService.findAllBanksWithoutAccountId(userDto.getId()).stream()
                .map(this::convertToBankDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bankList);
    }

    @PostMapping("/auth/chooseBank")
    public void chooseBank(@RequestBody @Valid ChooseBankDto chooseBankDto) {
         userService.chooseBank(chooseBankDto);
    }

    @PostMapping("/auth/fetchMyBanks")
    public ResponseEntity<?> fetchMyBanks(@RequestBody @Valid UserDto userDto) {
        List<BankDto> bankList = userService.findAllByAccountId(userDto.getId()).stream()
                .map(this::convertToBankDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bankList);
    }

    @PostMapping("/auth/fetchBank")
    public ResponseEntity<?> fetchBank(@RequestBody @Valid ChooseBankDto chooseBankDto) {
        UserDto userDtos = userService.findAccountInBank(chooseBankDto);
        return ResponseEntity.ok(userDtos);
    }

    @PostMapping("/auth/depositToSomeone")
    public ResponseEntity<?> depositToSomeone(@RequestBody @Valid DepositDto depositDto) {
        double deposit = userService.depositToSomeone(depositDto);

        DepositDto depositDto1 = new DepositDto();
        depositDto1.setDepositAmount(deposit);

        return ResponseEntity.ok(depositDto1);
    }

    @PostMapping("/auth/fetchAllTransactionsById")
    public ResponseEntity<?> fetchAllTransactionsById(@RequestBody @Valid ChooseBankDto chooseBankDto) {
        List<TransactionDto> transactionDtoList = userService.findAllTransactionsByAccountId(chooseBankDto).stream()
                .map(this::convertToTransactionDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(transactionDtoList);
    }

    @GetMapping("/auth/fetchAllBankAccounts")
    public ResponseEntity<?> fetchAllBankAccounts() {
        List<BankAccountDto> bankAccountDtoList = userService.findAllBankAccounts();

        return ResponseEntity.ok(bankAccountDtoList);
    }


}
