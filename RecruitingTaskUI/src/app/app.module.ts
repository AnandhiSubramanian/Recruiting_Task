import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, NotificationsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
