package com.banksystem.banksystem.dtos;

public class DepositDto {

    private int accountId;
    private int resultingId;
    private int bankId;
    private double depositAmount;
    private String transactionReason;

    public DepositDto() {
    }

    public DepositDto(int accountId, int bankId, double depositAmount,int resultingId,String transactionReason) {
        this.accountId = accountId;
        this.bankId = bankId;
        this.depositAmount = depositAmount;
        this.resultingId = resultingId;
        this.transactionReason = transactionReason;
    }

    public int getResultingId() {
        return resultingId;
    }

    public void setResultingId(int resultingId) {
        this.resultingId = resultingId;
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

    public double getDepositAmount() {
        return depositAmount;
    }

    public void setDepositAmount(double depositAmount) {
        this.depositAmount = depositAmount;
    }

    public String getTransactionReason() {
        return transactionReason;
    }

    public void setTransactionReason(String transactionReason) {
        this.transactionReason = transactionReason;
    }
}
