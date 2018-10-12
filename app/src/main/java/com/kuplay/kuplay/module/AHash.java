package com.kuplay.kuplay.module;

public class AHash {
    static {
        System.loadLibrary("native-lib");
    }

    public static native String ahash(byte[] pixels, int width, int height, int chanels);
}
