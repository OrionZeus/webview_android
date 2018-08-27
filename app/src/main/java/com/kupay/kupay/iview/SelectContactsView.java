package com.kupay.kupay.iview;

import com.kupay.kupay.base.BaseView;
import com.kupay.kupay.bean.ContactsInfo;

import java.util.List;

/**
 * Created by "iqos_jay@outlook.com" on 2018/8/27.
 */
public interface SelectContactsView extends BaseView {
    /**
     * 显示所有的联系人列表
     *
     * @param contactsInfoList 联系人列表
     */
    void onShowAllContacts(List<ContactsInfo> contactsInfoList);
}
