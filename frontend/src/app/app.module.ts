import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; // Para la barra de tareas
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // fomrularios
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // conexion con el back
import { AuthService } from './service/auth.service';
import { PersonComponent } from './person/list-person/person.component'; // importo la clase relacionada con el servicio
import { AuthGuard } from './guard/auth.guard';
import { CompanyComponent } from './company/list-company/company.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { PersonService } from './service/person.service';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { UserComponent } from './user/list-user/user.component';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    PersonComponent,
    CompanyComponent,
    CreatePersonComponent,
    CreateCompanyComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,     // importar aqui
    MatButtonModule,      // importar aqui
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [AuthService, AuthGuard, PersonService, // Meto aqui las clases de los servicios importados
    {
      provide: HTTP_INTERCEPTORS, //  Envío como objeto con estos campos
      useClass: TokenInterceptorService,  // Clase que hemos creado
      multi: true // Si queremos meter varios interceptores
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
