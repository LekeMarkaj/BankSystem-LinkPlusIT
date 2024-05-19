package com.banksystem.banksystem.dtos;

public class WithdrawalDto {

    private int accountId;
    private int bankId;
    private double withdrawalAmount;
    private String transactionReason;

    public WithdrawalDto() {
    }

    public WithdrawalDto(int accountId, int bankId, double withdrawalAmount,String transactionReason) {
        this.accountId = accountId;
        this.bankId = bankId;
        this.withdrawalAmount = withdrawalAmount;
        this.transactionReason = transactionReason;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public int getBankId() {
        return bankId;
    }

    public void setBankId(int bankId) {
        this.bankId = bankId;
    }

    public double getWithdrawalAmount() {
        return withdrawalAmount;
    }

    public void setWithdrawalAmount(double withdrawalAmount) {
        this.withdrawalAmount = withdrawalAmount;
    }

    public String getTransactionReason() {
        return transactionReason;
    }

    public void setTransactionReason(String transactionReason) {
        this.transactionReason = transactionReason;
    }
}
