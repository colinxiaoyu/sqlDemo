package com.sqlexample.RNCircleView;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by puxiang on 2018/1/26.
 */

public class CustomViewMoudle extends ReactContextBaseJavaModule {

    private CustomViewManager manager = null;
    boolean setVisiable = false;

    public CustomViewMoudle(ReactApplicationContext reactContext, CustomViewManager manager) {
        super(reactContext);
        this.manager = manager;
    }

    @Override
    public String getName() {
        return "CustomViewMoudle";
    }

    @ReactMethod
    public void setTitleToggle(final boolean visiable, final Promise promise) {
        try{
            setVisiable = !setVisiable;
            if(setVisiable){
                manager.getCustomView().setDialogue("我改变了View的值");
                promise.resolve("成功");
            }else {
                manager.getCustomView().setDialogue("改回来了");
                promise.resolve("也成功");
            }

        }catch (Exception e){
            promise.reject("123",e);
        }

    }
}
