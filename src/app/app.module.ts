import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListDisplayComponent } from './todo-list-display/todo-list-display.component';
import { HeaderComponent } from './header/header.component';
import { AddTaskComponent } from './todo-list-display/add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { EditTaskComponent } from './todo-list-display/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListDisplayComponent,
    HeaderComponent,
    AddTaskComponent,
    EditTaskComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
