package com.kuplay.kuplay.iview;

import com.kuplay.kuplay.base.BaseView;
import com.kuplay.kuplay.bean.ContactsInfo;

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
