package com.sqlexample.RNOpenDocPackage;

import android.os.Environment;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sqlexample.RNOpenDocPackage.utils.FileUtils;

import java.io.File;
import java.io.IOException;


/**
 * NativeModule that allows JS to open emails sending apps chooser.
 */
public class RNOpenDocModule extends ReactContextBaseJavaModule {

    public static final String TAG = "RNOpenDocModule";


    private static final String REACT_CLASS = "RNOpenDocModule";

    String docFile;
    String outhtmlFile;


    ReactApplicationContext reactContext;

    public RNOpenDocModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }


    @ReactMethod
    public void openDoc(String path, Promise promise) {

        if (Environment.getExternalStorageDirectory() != null) {
            docFile = path;
            String catchePath = FileUtils.getFolderName(path)+"/" + "Cache";
            String htmlName = FileUtils.getFileNameWithoutExtension(path)+".html";
            File file = new File(catchePath, htmlName);
            if (!file.exists()) {
                File dir = new File(catchePath);
                if (!dir.exists()) {
                    dir.mkdir();
                }
                try {
                    file.createNewFile();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            outhtmlFile = file.getAbsolutePath();
            new Thread(new ReadDocRunnable(promise)).start();
        }
    }


    class ReadDocRunnable implements Runnable {
        Promise promise;

        ReadDocRunnable(Promise promise) {
            this.promise = promise;
        }

        @Override
        public void run() {

            Log.d(TAG, "docFile:" + docFile + "outhtmlFile:" + outhtmlFile);
            SimpleWord2Html simpleWord2Html =
                    new SimpleWord2Html(docFile, outhtmlFile, Environment.getExternalStorageDirectory().getAbsolutePath() + "/"
                            + "Cache");
            if (simpleWord2Html.word2Html()) {
                promise.resolve("file://"+outhtmlFile);
                Log.d(TAG, "Update Web View");
            } else {
                promise.reject("k-00001","Read Doc Fail!");
                Log.e(TAG, "Read Doc Fail!");

            }
        }

    }


}
