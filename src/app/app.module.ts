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
import { MentorsComponent } from "./components/dashboard/mentors/mentors.component";
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    FilterPipe,
    HighlightPipe,
    ShortenPipe,
    MentorsComponent,
    SidebarComponent
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
