import { Component, OnInit ,Output ,EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit {
  @Output() location = new EventEmitter<string>();
  constructor(public dialog: MatDialog) {}
  address: string
  flag = false
  ngOnInit(): void {
    this.address = "usa 123 lt space"
  }
  
  openDialog() {
    
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.flag = true
      this.location.emit(result);
      console.log(`Dialog result: ${result}`);
    });
  }

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',  
  styleUrls: ['./map-dialog.component.css']

})
export class DialogContentExampleDialog {
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  address = "River Vally Road, Clarke Quay Blk 3A-3E, Liang Court, The Foothils at Fort Canning Park"
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]
  closeMapdialog(){

  }

}
