import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskDataService } from './list-data.service';

@Component({
  selector: 'app-todo-list-display',
  templateUrl: './todo-list-display.component.html',
  styleUrls: ['./todo-list-display.component.css']
})
export class TodoListDisplayComponent implements OnInit {

  taskData = [];    //Array of task Data displayed on screen
  allBuckets = [];  //Array of complete task Data
  totalTaskBucket = 0;
  start = 0;
  lastTask = 0;
  pageNumber = 1;
  noOfResults = 10;
  allTasks = [];
  selectedTasks = [];
  bucketIndex = 0;



  taskSubscription: Subscription;

  constructor(private taskDataService: TaskDataService,
    private router: Router) { }



  ngOnInit(): void {
    this.taskSubscription = this.taskDataService.listDataChanged
      .subscribe((serviceTaskData) => {
        console.log(serviceTaskData);
        this.taskData = [];
        this.allBuckets = serviceTaskData;
        this.totalTaskBucket = this.allBuckets.length;
        this.start = 0;
        this.pageNumber = 1;
        this.lastTask = this.noOfResults;
        this.taskData = this.allBuckets.slice(this.start, this.lastTask);
      });

    this.allBuckets = this.taskDataService.getListData();
    this.totalTaskBucket = this.allBuckets.length;
    this.lastTask = this.noOfResults;
    this.taskData = this.allBuckets.slice(this.start, this.lastTask);


  }

  // display the tasks of selected bucket.
  changeAllTasks(index) {
    this.allTasks = [];
    this.allTasks = this.allBuckets[index]["task"];
    this.bucketIndex = index;
    console.log(this.allBuckets);
  }


  onSubmit(pageForm: NgForm) {

    //Change number of Results per Page
    this.noOfResults = pageForm.value.noOfResults;
    console.log(this.noOfResults);

    this.totalTaskBucket = this.allBuckets[this.bucketIndex]["task"].length;

    //Reset values for start and end 
    this.start = 0;
    this.pageNumber = 1;
    this.lastTask = this.noOfResults;
    this.showFirstPage();
  }

  //go on first Page method
  showFirstPage() {
    this.start = 0;
    this.lastTask = this.noOfResults;
    this.allTasks = this.allBuckets[this.bucketIndex]["task"].slice(this.start, this.lastTask);
    this.pageNumber = (this.start / this.noOfResults) + 1;

  }

  //show previous page method
  showPreviousPage() {
    this.start = this.start - this.noOfResults;
    this.lastTask = this.start + this.noOfResults;
    this.allTasks = this.allBuckets[this.bucketIndex]["task"].slice(this.start, this.lastTask);
    this.pageNumber = (this.start / this.noOfResults) + 1;

  }

  //show next page  method
  showNextPage() {
    this.start = this.lastTask;
    this.lastTask = this.start + this.noOfResults;
    this.allTasks = this.allBuckets[this.bucketIndex]["task"].slice(this.start, this.lastTask);
    this.pageNumber = (this.start / this.noOfResults) + 1;
  }

  //show last page method
  showLastPage() {
    this.start = (this.totalTaskBucket % this.noOfResults === 0)
      ? (this.totalTaskBucket - this.noOfResults) : this.totalTaskBucket - (this.totalTaskBucket % this.noOfResults);

    this.pageNumber = (this.start / this.noOfResults) + 1;
    this.lastTask = this.totalTaskBucket;
    console.log(this.start, this.lastTask, this.pageNumber);
    this.allTasks = this.allBuckets[this.bucketIndex]["task"].slice(this.start, this.lastTask);
  }


  //sort by datecreated not completed
  ascendingDateCreated = true;
  sortByDateCreated() {
    console.log('clicked');

    this.ascendingDateCreated = !this.ascendingDateCreated;
    console.log(this.ascendingDateCreated);

    let arrSorted = this.allTasks;


    if (this.ascendingDateCreated) {
      for (let k = 0; k < arrSorted.length; k++) {
        for (let j = 0; j < arrSorted.length; j++) {
          if (arrSorted[j]["datecreated"] > arrSorted[j + 1]["datecreated"]) {
            let arr = arrSorted[j];
            arrSorted[j] = arrSorted[j + 1];
            arrSorted[j + 1] = arr;

          } else {
            let arr = arrSorted[j + 1];
            arrSorted[j] = arrSorted[j];
            arrSorted[j + 1] = arr;
          }
        }
      }

    } else {

      for (let k = 0; k < arrSorted.length; k++) {
        for (let j = 0; j < arrSorted.length; j++) {
          if (arrSorted[j]["datecreated"] < arrSorted[j + 1]["datecreated"]) {
            let arr = arrSorted[j];
            arrSorted[j] = arrSorted[j + 1];
            arrSorted[j + 1] = arr;

          } else {
            let arr = this.allBuckets[this.bucketIndex][j + 1];
            arrSorted[j] = arrSorted[j];
            arrSorted[j + 1] = arr;
          }
        }
      }
    }


    this.allTasks = arrSorted;
    this.taskDataService.updateSortedArray(arrSorted);

  }

  //sort by last date
  sortByLastDate() {

  }

  // getting the selected tasks to be deleted
  onCheckboxClicked(taskSelected) {

    if (this.selectedTasks.includes(taskSelected)) {
      this.selectedTasks.splice(this.selectedTasks.indexOf(taskSelected), 1);
    } else {
      this.selectedTasks.push(taskSelected);
    }
    console.log(this.selectedTasks);


  }

  // delete selected method
  deleteTask() {
    this.taskDataService.deleteTask(this.selectedTasks);
    this.selectedTasks = [];
  }

  // edit taskmethod
  editTaskMethod(editTaskIndex) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "bucketIndex": this.bucketIndex,
        "taskIndex": editTaskIndex
      }
    };
    this.router.navigate(["editTask"], navigationExtras);
  }


  //filtering by dates
  onFilter(filterForm: NgForm) {
    // console.log('clicked');
    this.pageNumber = 1;
    const filterStatus = filterForm.value.status;
    // console.log(filterStatus);
    const filterPriority = filterForm.value.priority;
    // console.log(filterPriority);
    let arr = this.allBuckets;
    let arrFiltered = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].task[0].status.toString() === filterStatus) {
        if (arr[i].task[0].priority.toString() === filterPriority) {
          // console.log(arr[i]);

          arrFiltered.push(arr[i]);
          // console.log(arrFiltered);


        }
      }
    }

    this.allBuckets = arrFiltered;
    this.taskDataService.updateFilterArray(arrFiltered);

  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }
}
