package com.panicrn;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.storage.AsyncLocalStorageUtil;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;

public class AsyncStorage {

    private ReactApplicationContext context;
    private SQLiteDatabase db = null;


    public AsyncStorage(ReactApplicationContext context){
        this.context = context;
    }

    public String getToken(){

        String value = "";
        try {

            db = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();

            value = AsyncLocalStorageUtil.getItemImpl(db,"currentUser");

        } finally {
            if (db != null){
                db.close();
            }

            return value;
        }
    }



}
