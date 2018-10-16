package com.kuplay.kuplay.bean;

import android.support.annotation.NonNull;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public class ContactsInfo implements Comparable<ContactsInfo> {
    private String name;//名字
    private String phoneNumber;//号码
    private boolean selected;//是否选中
    private String letter;//名字对应的拼音

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

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }

    @Override
    public int compareTo(@NonNull ContactsInfo o) {
        return this.getLetter().compareTo(o.getLetter());
    }
}
