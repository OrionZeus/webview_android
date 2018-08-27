package com.kupay.kupay.app;

import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.ActionBar;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;
import android.view.View;

import com.kupay.kupay.R;
import com.kupay.kupay.adapter.SelectContactsListAdapter;
import com.kupay.kupay.base.BaseActivity;
import com.kupay.kupay.bean.ContactsInfo;
import com.kupay.kupay.iview.SelectContactsView;
import com.kupay.kupay.presenter.SelectContactsPresenter;

import java.util.List;

public class SelectContactsActivity extends BaseActivity implements SelectContactsView, View.OnClickListener {

    private FloatingActionButton mFabAdd;
    private RecyclerView mRvContactList;
    private SelectContactsPresenter presenter = new SelectContactsPresenter(this);
    private SelectContactsListAdapter mAdapter = new SelectContactsListAdapter(this);

    /**
     * Get the layout resource from XML.
     *
     * @return layout resource from XML.
     */
    @Override
    protected int getLayoutResources() {
        return R.layout.activity_select_contacts;
    }

    /**
     * As the method name said,this method is used to initialize views on this activity.
     */
    @Override
    protected void initViews() {
        mRvContactList = findViewById(R.id.app_select_contacts_rv_contacts_list);
        mFabAdd = findViewById(R.id.app_select_contacts_fab_add);
    }

    /**
     * Initialize basic data.
     */
    @Override
    protected void init() {
        this.addBackButton();
        mFabAdd.setOnClickListener(this);
        LinearLayoutManager llm = new LinearLayoutManager(this);
        llm.setOrientation(LinearLayoutManager.VERTICAL);
        mRvContactList.setLayoutManager(llm);
        mRvContactList.setAdapter(mAdapter);
        presenter.initView(this);
        presenter.readAllContacts();
    }

    private void addBackButton() {
        ActionBar supportActionBar = getSupportActionBar();
        if (null == supportActionBar) return;
        supportActionBar.setDisplayHomeAsUpEnabled(true);
        supportActionBar.setDisplayShowHomeEnabled(true);
    }

    /**
     * 显示所有的联系人列表
     *
     * @param contactsInfoList 联系人列表
     */
    @Override
    public void onShowAllContacts(List<ContactsInfo> contactsInfoList) {
        mAdapter.setContactsInfoList(contactsInfoList);
        mAdapter.notifyDataSetChanged();
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * Called when a view has been clicked.
     *
     * @param v The view that was clicked.
     */
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            //添加
            case R.id.app_select_contacts_fab_add:
                presenter.addContacts();
                break;
        }
    }
}
