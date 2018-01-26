package com.sqlexample.RNCircleView;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.sqlexample.R;


/**
 * Created by puxiang on 2018/1/26.
 */

public class CustomView extends LinearLayout {

    private TextView mTitle;

    private TextView mDialogue;

    public CustomView(Context context) {

        super(context);

        LayoutInflater.from(context).inflate(R.layout.custom_view, this);

        mTitle = (TextView) findViewById(R.id.title);
        mDialogue = (TextView) findViewById(R.id.dialogue);

//        this.setOrientation(VERTICAL);
//
//
//        mTitle = new TextView(context);
//        mTitle.setBackgroundColor(Color.GREEN);
//
//        addView(mTitle, new LinearLayout.LayoutParams(
//
//                LinearLayout.LayoutParams.FILL_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
//
//        mDialogue = new TextView(context);
//
//        addView(mDialogue, new LinearLayout.LayoutParams(
//
//                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));

    }

    /**
     * Convenience method to set the title of a SpeechView
     */

    public void setTitle(String title) {

        mTitle.setText(title);

    }

    /**
     * Convenience method to set the dialogue of a SpeechView
     */

    public void setDialogue(String words) {

        mDialogue.setText(words);

    }
}
