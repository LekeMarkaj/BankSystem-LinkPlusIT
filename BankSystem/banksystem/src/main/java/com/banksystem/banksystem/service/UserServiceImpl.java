package com.banksystem.banksystem.service;

import com.banksystem.banksystem.dao.RoleDao;
import com.banksystem.banksystem.dao.UserDao;
import com.banksystem.banksystem.dtos.*;
import com.banksystem.banksystem.entity.*;
import com.banksystem.banksystem.exceptions.AppException;
import com.banksystem.banksystem.repository.BankRepository;
import com.banksystem.banksystem.repository.TransactionRepository;
import com.banksystem.banksystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService  {

    private final UserRepository userRepository;
    private final BankRepository bankRepository;
    private final TransactionRepository transactionRepository;
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final RoleDao roleDao;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,UserDao userDao,PasswordEncoder passwordEncoder,BankRepository bankRepository,RoleDao roleDao,TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.bankRepository = bankRepository;
        this.roleDao = roleDao;
        this.transactionRepository = transactionRepository;
    }

    public UserDto findUserByEmailAndConvert(String email) {
        Optional<Account> user1 = userRepository.findByEmail(email);

        if (user1.isEmpty()){
            return null;
        }
        Account user = user1.get();

        UserDto userDto = new UserDto();

        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setRoles(user.getRoles());
        userDto.setPassword(user.getPassword());
        userDto.setBalance(user.getBalance());

        return userDto;
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account user = userDao.findByEmailDAO(email);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid email or password.");
        }
        return new CustomUserDetails(user);
    }

    @Override
    public UserDto login(UserDto credentialsDto) {
        Optional<Account> user1 = userRepository.findByEmail(credentialsDto.getEmail());

        Account user = user1.get();

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            UserDto userDto = new UserDto();

            userDto.setEmail( user.getEmail() );
            userDto.setId( user.getId() );
            userDto.setName( user.getName() );
            userDto.setRoles( user.getRoles() );
            userDto.setPassword( user.getPassword() );

            return userDto;
        }else {
            throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void register(UserDto userDto) {
        Optional<Account> optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        Account user = new Account();

        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        Collection<Roles> collection = new ArrayList<>();
        collection.add(roleDao.findRoleByName("ROLE_USER"));
        user.setRoles(collection);

        userRepository.save(user);
    }

    @Override
    public UserDto findByLogin(String login,String token) {
        UserDto userDto = findUserByEmailAndConvert(login);
        userDto.setToken(token);
        return userDto;
    }

    @Override
    public void createBank(BankDto bankDto) {
        Optional<Bank> optionalBank = bankRepository.findByBankName(bankDto.getBankName());

        if (optionalBank.isPresent()) {
            throw new AppException("Bank already exists", HttpStatus.BAD_REQUEST);
        }

        Bank bank = new Bank();

        bank.setBankName(bankDto.getBankName());
        bank.setTransactionFlatFeeAmount(bankDto.getTransactionFlatFeeAmount());

        bankRepository.save(bank);
    }

    @Override
    public double withdraw(WithdrawalDto withdrawalDto) {
        Optional<Bank> optionalBank = bankRepository.findById(withdrawalDto.getBankId());

        if (optionalBank.isPresent()) {
            Bank bank = optionalBank.get();
            Optional<Account> optionalAccount = bank.getAccountList().stream()
                    .filter(account -> account.getId() == withdrawalDto.getAccountId())
                    .findFirst();

            if (optionalAccount.isPresent()) {
                Account account = optionalAccount.get();
                double accountBalance = account.getBalance();
                if (accountBalance>=withdrawalDto.getWithdrawalAmount()){
                    double newBalance = accountBalance-withdrawalDto.getWithdrawalAmount();
                    account.setBalance(newBalance);
                    userRepository.save(account);

                    Transaction transaction = new Transaction();
                    transaction.setAmount(withdrawalDto.getWithdrawalAmount());
                    transaction.setTransactionReason("Withdrawing money.");
                    transaction.setOriginatingId(withdrawalDto.getAccountId());
                    transaction.setBankId(withdrawalDto.getBankId());
                    transactionRepository.save(transaction);

                    List<Transaction> transactionList = transactionRepository.findAllByBankId(withdrawalDto.getBankId());
                    double totalTransactionFeeAmount = bank.getTransactionFlatFeeAmount();;
                    totalTransactionFeeAmount *= transactionList.size();
                    bank.setTotalTransactionFeeAmount(totalTransactionFeeAmount);

                    double totalTransferAmount = 0;
                    for (Transaction transaction2 : transactionList) {
                        totalTransferAmount += transaction2.getAmount();
                    }
                    bank.setTotalTransferAmount(totalTransferAmount);

                    bankRepository.save(bank);

                    return withdrawalDto.getWithdrawalAmount();
                }else {
                    throw new AppException("You dont have enough funds!", HttpStatus.BAD_REQUEST);
                }
            }
        }

        throw new AppException("Bank doesnt exist!", HttpStatus.BAD_REQUEST);
    }

    @Override
    public double deposit(DepositDto depositDto) {
        Optional<Bank> optionalBank = bankRepository.findById(depositDto.getBankId());

        if (optionalBank.isPresent()) {
            Bank bank = optionalBank.get();
            Optional<Account> optionalAccount = bank.getAccountList().stream()
                    .filter(account -> account.getId() == depositDto.getAccountId())
                    .findFirst();

            if (optionalAccount.isPresent()) {
                Account account = optionalAccount.get();
                double accountBalance = account.getBalance();
                accountBalance += depositDto.getDepositAmount();
                account.setBalance(accountBalance);
                userRepository.save(account);

                Transaction transaction = new Transaction();
                transaction.setAmount(depositDto.getDepositAmount());
                transaction.setTransactionReason("Depositing to myself.");
                transaction.setOriginatingId(depositDto.getAccountId());
                transaction.setBankId(depositDto.getBankId());
                transactionRepository.save(transaction);

                List<Transaction> transactionList = transactionRepository.findAllByBankId(depositDto.getBankId());
                double totalTransactionFeeAmount = bank.getTransactionFlatFeeAmount();;
                totalTransactionFeeAmount *= transactionList.size();
                bank.setTotalTransactionFeeAmount(totalTransactionFeeAmount);

                double totalTransferAmount = 0;
                for (Transaction transaction2 : transactionList) {
                    totalTransferAmount += transaction2.getAmount();
                }
                bank.setTotalTransferAmount(totalTransferAmount);

                bankRepository.save(bank);
                return depositDto.getDepositAmount();
            }
        }

        throw new AppException("Bank doesnt exist!", HttpStatus.BAD_REQUEST);
    }

    @Override
    public List<Bank> findAllBanksWithoutAccountId(int id) {

        return bankRepository.findAllBanksWithoutAccountId(id);
    }

    @Override
    public void chooseBank(ChooseBankDto chooseBankDto) {
        Optional<Bank> optionalBank = bankRepository.findById(chooseBankDto.getBankId());
        Optional<Account> optionalAccount = userRepository.findById(chooseBankDto.getAccountId());

        if (optionalBank.isPresent() && optionalAccount.isPresent()) {
            Bank bank = optionalBank.get();
            Account account = optionalAccount.get();
            bank.getAccountList().add(account);
            bankRepository.save(bank);
        }
    }

    @Override
    public List<Bank> findAllByAccountId(int id) {
        return bankRepository.findAllByAccountId(id);
    }

    @Override
    public UserDto findAccountInBank(ChooseBankDto chooseBankDto) {
        Optional<Bank> optionalBank = bankRepository.findById(chooseBankDto.getBankId());

        if (optionalBank.isPresent()) {
            Bank bank = optionalBank.get();
            Optional<Account> optionalAccount = bank.getAccountList().stream()
                    .filter(account -> account.getId() == chooseBankDto.getAccountId())
                    .findFirst();

            if (optionalAccount.isPresent()) {
                Account account = optionalAccount.get();
                UserDto userDto = new UserDto();
                userDto.setBalance(account.getBalance());
                userDto.setId(account.getId());
                return userDto;
            }
        }

        return null;
    }

    @Override
    public double depositToSomeone(DepositDto depositDto) {
        Optional<Bank> optionalBank = bankRepository.findById(depositDto.getBankId());

        if (optionalBank.isPresent()) {
            Bank bank = optionalBank.get();
            Optional<Account> myAccount = bank.getAccountList().stream()
                    .filter(account -> account.getId() == depositDto.getAccountId())
                    .findFirst();

            Optional<Account> resultingAccount = bank.getAccountList().stream()
                    .filter(account -> account.getId() == depositDto.getResultingId())
                    .findFirst();

            if (myAccount.isPresent() && resultingAccount.isPresent()) {
                Account myAccount2 = myAccount.get();
                double myAccountBalance = myAccount2.getBalance();
                if (myAccountBalance>=depositDto.getDepositAmount()) {
                    myAccountBalance -= depositDto.getDepositAmount();
                    myAccount2.setBalance(myAccountBalance);
                    userRepository.save(myAccount2);

                    Account resultingAccount2 = resultingAccount.get();
                    double resultingAccountBalance = resultingAccount2.getBalance();
                    resultingAccountBalance += depositDto.getDepositAmount();
                    resultingAccount2.setBalance(resultingAccountBalance);
                    userRepository.save(resultingAccount2);

                    Transaction transaction = new Transaction();
                    transaction.setAmount(depositDto.getDepositAmount());
                    transaction.setTransactionReason("Depositing to someone.");
                    transaction.setOriginatingId(depositDto.getAccountId());
                    transaction.setResultingId(depositDto.getResultingId());
                    transaction.setBankId(depositDto.getBankId());
                    transactionRepository.save(transaction);

                    List<Transaction> transactionList = transactionRepository.findAllByBankId(depositDto.getBankId());
                    double totalTransactionFeeAmount = bank.getTransactionFlatFeeAmount();
                    totalTransactionFeeAmount *= transactionList.size();
                    bank.setTotalTransactionFeeAmount(totalTransactionFeeAmount);

                    double totalTransferAmount = 0;
                    for (Transaction transaction2 : transactionList) {
                         totalTransferAmount += transaction2.getAmount();
                    }
                    bank.setTotalTransferAmount(totalTransferAmount);

                    bankRepository.save(bank);
                    return depositDto.getDepositAmount();
                }else {
                    throw new AppException("You dont have enough funds!", HttpStatus.BAD_REQUEST);
                }
            }
        }

        throw new AppException("Bank doesnt exist!", HttpStatus.BAD_REQUEST);
    }

    @Override
    public List<Transaction> findAllTransactionsByAccountId(ChooseBankDto chooseBankDto) {

        return transactionRepository.findAllByOriginatingIdAndBankId(chooseBankDto.getAccountId(),chooseBankDto.getBankId());
    }

    @Override
    public List<BankAccountDto> findAllBankAccounts() {
        List<BankAccountDto> bankAccountDtoList = new ArrayList<>();
        List<Bank> bankList = bankRepository.findAll();

        for (Bank bank : bankList) {
            BankAccountDto accountDto = new BankAccountDto();
            accountDto.setBankName(bank.getBankName());
            accountDto.setAccountList(bank.getAccountList());
            accountDto.setTotalTransactionFeeAmount(bank.getTotalTransactionFeeAmount());
            accountDto.setTotalTransferAmount(bank.getTotalTransferAmount());
            bankAccountDtoList.add(accountDto);
        }

        return bankAccountDtoList;
    }


}
