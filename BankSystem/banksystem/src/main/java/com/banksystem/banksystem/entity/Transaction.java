package com.banksystem.banksystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "amount")
    private double amount;

    @Column(name = "originating_id")
    private int originatingId;

    @Column(name = "bank_id")
    private int bankId;

    @Column(name = "resulting_id")
    private int resultingId;

    @Column(name = "transaction_reason")
    private String transactionReason;

    public Transaction() {
    }

    public Transaction(int id, double amount, int originatingId, int bankId, int resultingId, String transactionReason) {
        this.id = id;
        this.amount = amount;
        this.originatingId = originatingId;
        this.bankId = bankId;
        this.resultingId = resultingId;
        this.transactionReason = transactionReason;
    }

    public int getBankId() {
        return bankId;
    }

    public void setBankId(int bankId) {
        this.bankId = bankId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getOriginatingId() {
        return originatingId;
    }

    public void setOriginatingId(int originatingId) {
        this.originatingId = originatingId;
    }

    public int getResultingId() {
        return resultingId;
    }

    public void setResultingId(int resultingId) {
        this.resultingId = resultingId;
    }

    public String getTransactionReason() {
        return transactionReason;
    }

    public void setTransactionReason(String transactionReason) {
        this.transactionReason = transactionReason;
    }

}
