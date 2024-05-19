package com.banksystem.banksystem.dtos;

import com.banksystem.banksystem.entity.Account;

import java.util.List;

public class BankAccountDto {

    private String bankName;
    private List<Account> accountList;
    private double totalTransactionFeeAmount;
    private double totalTransferAmount;

    public BankAccountDto() {
    }

    public BankAccountDto(String bankName, List<Account> accountList, double totalTransactionFeeAmount, double totalTransferAmount) {
        this.bankName = bankName;
        this.accountList = accountList;
        this.totalTransactionFeeAmount = totalTransactionFeeAmount;
        this.totalTransferAmount = totalTransferAmount;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public List<Account> getAccountList() {
        return accountList;
    }

    public void setAccountList(List<Account> accountList) {
        this.accountList = accountList;
    }

    public double getTotalTransactionFeeAmount() {
        return totalTransactionFeeAmount;
    }

    public void setTotalTransactionFeeAmount(double totalTransactionFeeAmount) {
        this.totalTransactionFeeAmount = totalTransactionFeeAmount;
    }

    public double getTotalTransferAmount() {
        return totalTransferAmount;
    }

    public void setTotalTransferAmount(double totalTransferAmount) {
        this.totalTransferAmount = totalTransferAmount;
    }
}
