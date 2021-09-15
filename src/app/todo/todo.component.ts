import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [FormBuilder]
})
export class TodoComponent implements OnInit {
  select: any;
  // @ts-ignore
  toDoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<TodoComponent>,
              private service: ProjectService,
              private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initForm()
    this.service.getToDoList('/titles').subscribe(data => {
      if (data.length > 0) {
        this.select = data
      }
    })
  }

  initForm() {
    this.toDoForm = this.fb.group({
      title_id: [``],
      text: [``],
    });
  }

  closeDialog(isNew: boolean) {
    this.dialogRef.close(isNew ? this.toDoForm.value : null)
  }

}
