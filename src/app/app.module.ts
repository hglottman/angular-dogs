import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { DogsComponent } from './dogs/dogs.component';
import { DogsService } from './dogs.service';



@NgModule({
  declarations: [
    AppComponent,
    AddDogComponent,
    AddOwnerComponent,
    DogsComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [DogsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
