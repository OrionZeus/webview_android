package com.yineng.yishizhizun.util;

import android.os.Environment;
import android.util.Base64;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by "iqos_jay@outlook.com" on 2018/6/22.
 * File Tools
 */
public class FileUtil {
    private static final String TAG = "FileUtil";

    /**
     * 文件转base64字符串
     *
     * @param file 要转换的文件
     * @return 转换过后的字符串
     */
    public static String fileToBase64(File file) {
        String base64 = null;
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            byte[] bytes = new byte[in.available()];
            int length = in.read(bytes);
            base64 = Base64.encodeToString(bytes, 0, length, Base64.DEFAULT);
        } catch (IOException e) {
            Logger.error(TAG, e.getMessage());
        } finally {
            try {
                if (in != null)
                    in.close();
            } catch (IOException e) {
                Logger.error(TAG, e.getMessage());
            }
        }
        return base64;
    }

    /**
     * base64字符串转文件
     *
     * @param base64 base64字符串
     * @return 转换完成之后的文件
     */
    public static File base64ToFile(String base64) {
        File file = null;
        String fileName = "/Petssions/record/testFile.amr";
        FileOutputStream out = null;
        try {
            // 解码，然后将字节转换为文件
            file = new File(Environment.getExternalStorageDirectory(), fileName);
            if (!file.exists()) {
                boolean newFile = file.createNewFile();
                if (!newFile) return file;
            }
            byte[] bytes = Base64.decode(base64, Base64.DEFAULT);// 将字符串转换为byte数组
            ByteArrayInputStream in = new ByteArrayInputStream(bytes);
            byte[] buffer = new byte[1024];
            out = new FileOutputStream(file);
            int byteRead;
            while ((byteRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, byteRead); // 文件写操作
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                if (out != null)
                    out.close();
            } catch (IOException e) {
                Logger.error(TAG, e.getMessage());
            }
        }
        return file;
    }
}
