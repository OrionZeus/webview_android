package com.kupay.kupay.bean;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public class ContactsInfo {
    private String name;
    private String phoneNumber;
    private boolean selected;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }
}
