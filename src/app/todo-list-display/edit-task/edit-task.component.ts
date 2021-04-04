import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDataService } from '../list-data.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  updateTask;
  completeListData;
  taskIndex;
  bucketIndex;

  constructor(private taskDataService: TaskDataService,
              private activatedRoute: ActivatedRoute,
             private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.taskIndex= (params["taskIndex"]);
      this.bucketIndex = (params["bucketIndex"]);

    });
    this.updateTask = this.taskDataService.getTaskByIndex(this.bucketIndex,this.taskIndex);
    console.log(this.updateTask);
  }

  onSubmit(taskForm: NgForm) {
    const value = taskForm.value;

    this.updateTask = {
      "bucketName": value.bucketName,
      "task": [{
        "task": value.taskName,
        "dateCreated": value.dateCreated,
        "lastDate": value.lastDate,
        "status": value.status,
        "priority": value.priority
      }]
     

    }
   
    

    this.taskDataService.setListData(this.updateTask);
  }

  clearForm(){

  }

}
