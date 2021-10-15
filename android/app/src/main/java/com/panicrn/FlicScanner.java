package com.panicrn;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.PackageList;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import io.flic.flic2libandroid.Flic2Button;
import io.flic.flic2libandroid.Flic2ButtonListener;
import io.flic.flic2libandroid.Flic2Manager;
import io.flic.flic2libandroid.Flic2ScanCallback;

public class FlicScanner extends ReactContextBaseJavaModule  {

    Flic2Manager manager;
    AsyncStorage storage;
    AlarmManager alarmManager;

    FlicScanner(ReactApplicationContext context){
        super(context);
        this.storage = new AsyncStorage(context);
        this.alarmManager = new AlarmManager(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "FlicScanner";
    }

    @ReactMethod
    public void scanButtons() {

        if (!(ActivityCompat.checkSelfPermission(getReactApplicationContext(),Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED)){
            Log.e("Flic","Not enough permissions");
            return;
        }
            Flic2Manager.getInstance().startScan(new Flic2ScanCallback() {
                @Override
                public void onDiscoveredAlreadyPairedButton(Flic2Button button) {
                    Log.e("Flic2","Discovered already paired button!");
                    button.connect();
                }

                @Override
                public void onDiscovered(String bdAddr) {
                    Log.e("Flic2","Discovered button!");

                }

                @Override
                public void onConnected() {
                    Log.e("Flic2","Connected button!");
                }

                @Override
                public void onComplete(int result, int subCode, Flic2Button button) {
                    if (result == Flic2ScanCallback.RESULT_SUCCESS){
                        Toast.makeText(getReactApplicationContext(),"Connected button with MAC : "+button.getUuid(),Toast.LENGTH_SHORT).show();
                        addButtonListener(button);
                    }
                }
            });

    }

    @ReactMethod
    public void initFlicInstance(){
        Log.e("Flic","Init Flic instance and Foreground service");
        ContextCompat.startForegroundService(getReactApplicationContext(),new Intent(getReactApplicationContext(), FlicService.class));
        manager = Flic2Manager.initAndGetInstance(getReactApplicationContext(),new Handler());
    }

    @ReactMethod
    public void flicToast(){
        Toast.makeText(getReactApplicationContext(),"Pressed from Java module",Toast.LENGTH_SHORT).show();
    }

    public void addButtonListener(Flic2Button button) {
        button.addListener(new Flic2ButtonListener(){
            @Override
            public void onButtonSingleOrDoubleClickOrHold(Flic2Button button, boolean wasQueued, boolean lastQueued, long timestamp, boolean isSingleClick, boolean isDoubleClick, boolean isHold) {

                if (isSingleClick){
                    Toast.makeText(getReactApplicationContext(),"Has hecho un click al botón",Toast.LENGTH_SHORT).show();
                }

                if (isDoubleClick){
                    Toast.makeText(getReactApplicationContext(),"Has hecho doble click al botón",Toast.LENGTH_SHORT).show();
                }

                if (isHold){
                    Toast.makeText(getReactApplicationContext(),"Has mantenido el botón",Toast.LENGTH_SHORT).show();
                }

                String token = storage.getToken();
                alarmManager.addAlarm(token);
            }
        });
    }
}
