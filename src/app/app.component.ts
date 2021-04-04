import { Component } from '@angular/core';
import { TaskDataService } from './todo-list-display/list-data.service';
import { BucketDetail } from './todo-list-display/todo-task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dataService: TaskDataService,){}


  title = 'todo-app';

  ngOnInit(): void{


    let taskData = JSON.parse(window.localStorage.getItem('taskData'));
    if(taskData){

      this.dataService.setListData(taskData);
    }
 

  }
}
