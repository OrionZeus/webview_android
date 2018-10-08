package com.kuplay.kuplay.adapter;

import android.app.Activity;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.TextView;

import com.kuplay.kuplay.R;
import com.kuplay.kuplay.bean.ContactsInfo;

import java.util.List;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public class SelectContactsListAdapter extends RecyclerView.Adapter<SelectContactsListAdapter.ContactsViewHolder> {
    private Activity ctx;
    private List<ContactsInfo> mContactsInfoList;

    public SelectContactsListAdapter(Activity ctx) {
        this.ctx = ctx;
    }

    public void setContactsInfoList(List<ContactsInfo> contactsInfoList) {
        mContactsInfoList = contactsInfoList;
    }

    @NonNull
    @Override
    public ContactsViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view;
        view = LayoutInflater.from(ctx).inflate(R.layout.item_select_contacts_list, parent, false);
        return new ContactsViewHolder(view);
    }


    @Override
    public void onBindViewHolder(@NonNull ContactsViewHolder holder, int position) {
        final ContactsInfo contactsInfo = mContactsInfoList.get(position);
        if (null == contactsInfo) return;
        String name = contactsInfo.getName();//名字
        String phoneNumber = contactsInfo.getPhoneNumber();//手机号码
        holder.mTvName.setText(name);
        holder.mTvNumber.setText(phoneNumber);
        holder.mCheckBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                contactsInfo.setSelected(isChecked);
            }
        });
        holder.mCheckBox.setChecked(contactsInfo.isSelected());
    }

    @Override
    public int getItemCount() {
        return null == mContactsInfoList ? 0 : mContactsInfoList.size();
    }

    static class ContactsViewHolder extends RecyclerView.ViewHolder {
        TextView mTvName, mTvNumber;
        CheckBox mCheckBox;

        ContactsViewHolder(View itemView) {
            super(itemView);
            mTvName = itemView.findViewById(R.id.item_select_contacts_tv_name);
            mTvNumber = itemView.findViewById(R.id.item_select_contacts_tv_number);
            mCheckBox = itemView.findViewById(R.id.item_select_contacts_cb);
        }
    }
}
