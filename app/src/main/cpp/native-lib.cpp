#include <jni.h>
#include <string>

#include "ahash.h"

extern "C" JNIEXPORT jstring

JNICALL Java_com_kuplay_kuplay_module_AHash_ahash(
        JNIEnv *env,
        jobject,
        jintArray jpixels,
        jint width,
        jint height,
        jint channels) {

    if (jpixels == NULL)
        return env->NewStringUTF("");

    jsize len = env->GetArrayLength(jpixels);
    jint *pixels = (jint *)malloc(len * sizeof(jint));
    env->GetIntArrayRegion(jpixels, 0, len, pixels);

    char *result = ahashImpl((int *)pixels, width, height, channels);

    jstring s;
    if (result != NULL)
        s = env->NewStringUTF(result);
    else
        s = env->NewStringUTF("");

    free(pixels);
    if (result != NULL) {
        free(result);
    }

    return s;
}