package com.example.lpoon2.livestream_test;

import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.VideoView;

public class MainActivity extends ActionBarActivity {
    private VideoView vidView = (VideoView)findViewById(R.id.myVideo);
    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_main);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

        this.setContentView(R.layout.activity_main);
        String vidAddress = "rtsp://10.192.41.141:80/file/test.mp4";
        Uri vidUri = Uri.parse(vidAddress);
        vidView.setVideoURI(vidUri);
        vidView.start();

//        videoView = (VideoView)this.findViewById(R.id.videoView);
//
//        MediaController mc = new MediaController(this);
//        videoView.setMediaController(mc);
//
//
//        //Set the path of Video or URI
//        //videoView.setVideoURI(Uri.parse("rtsp://10.192.41.141:80/file/test.mp4"));
//        //
//
//        //Set the focus
//        videoView.requestFocus();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
