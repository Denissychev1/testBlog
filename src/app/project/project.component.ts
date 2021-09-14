import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {MatDialog} from "@angular/material/dialog";
import {TodoComponent} from "../todo/todo.component";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  titles: any;
  todoList: any;

  constructor(private service: ProjectService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
   this.refreshTodos()
  }

  addNewTodo(id: number) {
    const dialogRef = this.dialog.open(TodoComponent, {
        width: '60%',
        maxHeight: '100vh - 100px',
        data: {titleId: id}
      }
    );
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.service.postToDo(data).subscribe(data =>{
          this.refreshTodos()
        })
      }else{
      this.refreshTodos()}
    })
  }

  refreshTodos() {
    this.service.getToDoTitles('/titles').subscribe(data => {
      this.titles = data;
      console.log(data)
    });
    this.service.getToDoList('/todos').subscribe(data => {
      if (this.titles.length > 0 && data.length > 0) {
        this.titles.forEach((x: { list: any; id: any; }) => {
          x.list = data.filter((y: { title_id: any; }) => y.title_id === x.id)
        })
      }
    })

  }

}
