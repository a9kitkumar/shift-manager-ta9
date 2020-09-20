import { Component, OnInit ,Output ,EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit {
  @Output() location = new EventEmitter<string>();
  constructor(public dialog: MatDialog) {}
  address: string
  ngOnInit(): void {
    this.address = "usa 123 lt space"
  }
  openDialog() {
    this.location.emit(this.address);
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
