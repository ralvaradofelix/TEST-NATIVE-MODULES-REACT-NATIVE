package com.panicrn;

import android.util.Log;

import androidx.annotation.NonNull;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class AlarmManager extends ReactContextBaseJavaModule {

    private ReactApplicationContext context;
    private RequestQueue requestQueue;

    public AlarmManager(ReactApplicationContext context){
        this.context = context;
        this.requestQueue = Volley.newRequestQueue(context);
    }


    @NonNull
    @Override
    public String getName() {
        return "AlarmManager";
    }

    @ReactMethod
    public void addAlarm(String token){

        String url = "http://panic.wigilan.com:5005/api/alarms";
        StringRequest stringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.e("alarmRequest","Alarm successfully inserted");
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("alarmRequest","Error while saving an alarm");
            }
        }){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> headers = new HashMap<String,String>();
                headers.put("Authorization","Bearer "+token);
                headers.put("Content-type","application/json");
                return headers;
            }
        };

        requestQueue.add(stringRequest);

    }

}
