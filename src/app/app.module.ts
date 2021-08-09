import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
// Services
import { AuthService } from "./services/auth.service";
import { TokenInterceptorService } from "./services/token-interceptor.service";
// Guards
import { AuthGuard } from "./guards/auth.guard";
// Components
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
// Pipes
import { FilterPipe } from "./pipes/filter.pipe";
import { HighlightPipe } from "./pipes/highlight.pipe";
import { ShortenPipe } from "./pipes/shorten.pipe";
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { UnderconstComponent } from './components/underconst/underconst.component';
import { UploadComponent } from './components/upload/upload.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    FilterPipe,
    HighlightPipe,
    ShortenPipe,
    FooterComponent,
    AboutComponent,
    LandingComponent,
    SignupComponent,
    UnderconstComponent,
    UploadComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
