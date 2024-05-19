package com.banksystem.banksystem.dtos;

public class TransactionDto {

    private double amount;
    private int transactionId;
    private int bankId;
    private int originatingId;
    private int resultingId;
    private String transactionReason;

    public TransactionDto() {
    }

    public TransactionDto(double amount, int transactionId, int bankId, int originatingId, int resultingId, String transactionReason) {
        this.amount = amount;
        this.transactionId = transactionId;
        this.bankId = bankId;
        this.originatingId = originatingId;
        this.resultingId = resultingId;
        this.transactionReason = transactionReason;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getBankId() {
        return bankId;
    }

    public void setBankId(int bankId) {
        this.bankId = bankId;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public int getOriginatingId() {
        return originatingId;
    }

    public void setOriginatingId(int originatingId) {
        this.originatingId = originatingId;
    }

    public String getTransactionReason() {
        return transactionReason;
    }

    public void setTransactionReason(String transactionReason) {
        this.transactionReason = transactionReason;
    }

    public int getResultingId() {
        return resultingId;
    }

    public void setResultingId(int resultingId) {
        this.resultingId = resultingId;
    }
}
