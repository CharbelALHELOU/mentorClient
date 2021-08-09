import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./guards/auth.guard";

import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AboutComponent } from "./components/about/about.component";
import { LandingComponent } from "./components/landing/landing.component";
import { SignupComponent } from "./components/signup/signup.component";
import { UnderconstComponent } from "./components/underconst/underconst.component";
import { UploadComponent } from "./components/upload/upload.component";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "", component: LandingComponent },
  { path: "dashboard", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: SignupComponent },
  { path: "upload/:id", component: UploadComponent },
  { path:"about", component: AboutComponent},
  { path:"unavailable", component: UnderconstComponent},
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  LoginComponent,
  PageNotFoundComponent
];
