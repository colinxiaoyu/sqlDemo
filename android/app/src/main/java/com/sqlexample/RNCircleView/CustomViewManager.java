package com.sqlexample.RNCircleView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by puxiang on 2018/1/26.
 */

public class CustomViewManager extends SimpleViewManager {

    CustomView customView = null;

    public CustomView getCustomView() {
        return customView;
    }

    @Override
    public String getName() {
        return "AndroidCustomView";
    }


    @Override
    protected CustomView createViewInstance(ThemedReactContext reactContext) {
        customView = new CustomView(reactContext);
        return customView;
    }


    @ReactProp(name = "title")
    public void setTitle(CustomView view, String title) {
        view.setTitle(title);
    }


    @ReactProp(name = "dialogue")
    public void setDialogue(CustomView view, String dialogue) {
        view.setDialogue(dialogue);
    }
}
