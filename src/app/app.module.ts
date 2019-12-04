import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyCSyW0glD5AyYxQR8fdL0lLZb8geedEe-M",
  authDomain: "todoionic-6285e.firebaseapp.com",
  databaseURL: "https://todoionic-6285e.firebaseio.com",
  projectId: "todoionic-6285e",
  storageBucket: "todoionic-6285e.appspot.com",
  messagingSenderId: "451654830005",
  appId: "1:451654830005:web:637f922343c28a580e7bfc"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
