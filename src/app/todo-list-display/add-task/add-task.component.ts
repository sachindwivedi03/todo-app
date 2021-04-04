import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskDataService } from '../list-data.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('taskForm', { static: false }) taskForm: NgForm;

  newTodo;
  completeListData;

  constructor(private taskDataService: TaskDataService) { }

  ngOnInit(): void {
  }

  onSubmit(taskForm: NgForm) {
    const value = taskForm.value;

    //input data structure 
    this.newTodo = {
      "bucketName": value.bucketName,
      "task": [{
        "task": value.taskName,
        "dateCreated": value.dateCreated,
        "lastDate": value.lastDate,
        "status": value.status,
        "priority": value.priority
      }]

    }
    console.log('newTodo', this.newTodo);



    this.taskDataService.addNewTodo(this.newTodo);

    this.clearForm();
  }

  clearForm() {
    this.taskForm.reset();
  }

}
