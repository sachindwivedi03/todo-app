import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './todo-list-display/add-task/add-task.component';
import { EditTaskComponent } from './todo-list-display/edit-task/edit-task.component';
import { TodoListDisplayComponent } from './todo-list-display/todo-list-display.component';

const routes: Routes = 

[
  {path: '', redirectTo: '/tasklist' , pathMatch: 'full'},
  {path: 'tasklist', component: TodoListDisplayComponent},
  {path: 'addtask', component: AddTaskComponent },
  {path: 'editTask', component: EditTaskComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}