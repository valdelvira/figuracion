import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PersonComponent } from './person/list-person/person.component';
import { CompanyComponent } from './company/list-company/company.component';
import { AuthGuard } from './guard/auth.guard';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { UserComponent } from './user/list-user/user.component';


const routes: Routes = [  // Defino desde aquí las rutas
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'person',
    component: PersonComponent
  },
  {
    path: 'newperson',
    component: CreatePersonComponent
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [AuthGuard]  // Controlo que sólo puedan acceder los logados
  },
  {
    path: 'newcompany',
    component: CreateCompanyComponent,
    canActivate: [AuthGuard]  // Controlo que sólo puedan acceder los logados
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]  // Controlo que sólo puedan acceder los logados
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
