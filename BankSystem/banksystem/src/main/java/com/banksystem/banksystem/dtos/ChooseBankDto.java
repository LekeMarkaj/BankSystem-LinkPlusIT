package com.banksystem.banksystem.dtos;

public class ChooseBankDto {
    private int accountId;
    private int bankId;

    public ChooseBankDto() {
    }

    public ChooseBankDto(int accountId, int bankId) {
        this.accountId = accountId;
        this.bankId = bankId;
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
}
