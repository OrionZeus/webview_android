package com.yineng.yishizhizun.iview;

import com.yineng.yishizhizun.base.BaseView;
import com.yineng.yishizhizun.bean.FileItem;

import java.util.List;

/**
 * Created by "iqos_jay@outlook.com" on 2018/7/6.
 */
public interface SelectImageView extends BaseView {
    /**
     * Show all images' preview from local.
     *
     * @param fileItemList image's information,include:path,selected status.
     */
    void onShowAllPreview(List<FileItem> fileItemList);
}
