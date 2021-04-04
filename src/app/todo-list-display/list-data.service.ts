import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class TaskDataService {

    listDataChanged = new Subject<any>();
    rerender = new Subject<any>();
    taskListData = [];
    taskSubs: Subscription;


    //update the tasklist data
    setListData(listDataArray) {
        this.taskListData = listDataArray;
        this.listDataChanged.next(this.taskListData);

    }



    //add new task data
    addNewTodo(newTodo) {
        if (this.taskListData.length == 0) {
            this.taskListData.push(newTodo);
        } else {
            let found = false;
            for (let task of this.taskListData) {
                if (task.bucketName == newTodo.bucketName) {
                    found = true;
                    task.task.push(newTodo.task[0])
                }
            }
            if (!found) {
                this.taskListData.push(newTodo);
            }
        }
        this.listDataChanged.next(this.taskListData);
        console.log(this.taskListData);

        this.saveToLocalStorage();
    }

    // delete tasks data
    deleteTask(selectedTasks) {

        for (let task of selectedTasks) {
            let index = this.taskListData.findIndex(x => x.selectedTasks === task);
            console.log(selectedTasks);
            console.log(this.taskListData);
            console.log(index);
            console.log(task);
            this.taskListData.splice(index, 1);
        }
        this.listDataChanged.next(this.taskListData);


        this.saveToLocalStorage();

    }


    //edit a task
    editTaskMethod(editTask, updateTask) {
        const index = this.taskListData.findIndex(x => x.taskListData === editTask);

        this.taskListData[index] = updateTask;
        this.listDataChanged.next(this.taskListData);
        console.log(this.listDataChanged)

        this.saveToLocalStorage();

    }


    //storing data in local storage after filtering or sorting
    updateFilterArray(updateFilterArray) {
        this.listDataChanged.next(updateFilterArray);
    }
    // storing data after sorting
    updateSortedArray(updateSortedArray) {
        this.listDataChanged.next(this.updateSortedArray);
    }



    //get list data
    getListData() {
        return this.taskListData;
    }


    // get 1 task by id
    getTaskByIndex(bucketIndex, taskIndex) {
        // return  this.taskListData[bucketIndex]["task"][taskIndex];

        let updateTask = {
            "bucketName": this.taskListData[bucketIndex]["bucketName"],
            "task": []
        }
        updateTask.task.push(this.taskListData[bucketIndex]["task"][taskIndex]);
        return updateTask;
    }

    //save data to local storage after update
    saveToLocalStorage() {
        window.localStorage.clear();
        window.localStorage.setItem('taskData', JSON.stringify(this.taskListData));
    }

}