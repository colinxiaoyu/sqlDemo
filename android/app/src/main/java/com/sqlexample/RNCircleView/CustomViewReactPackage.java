package com.sqlexample.RNCircleView;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by puxiang on 2018/1/26.
 */

public class CustomViewReactPackage implements ReactPackage {
    CustomViewManager manager = null;
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        CustomViewMoudle mModule = new CustomViewMoudle(reactContext,manager);
        modules.add(mModule);
        return modules;
    }

//    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        manager = new CustomViewManager();
        return Arrays.<ViewManager>asList(
                manager
        );
    }
}
