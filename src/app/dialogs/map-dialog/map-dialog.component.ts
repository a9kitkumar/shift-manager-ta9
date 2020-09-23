import {MatDialog} from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { defaults as defaultControls } from 'ol/control';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {Vector as VectorLayer} from 'ol/layer';
import Overlay from 'ol/Overlay';
import TileJSON from 'ol/source/TileJSON';
import {Icon, Style} from 'ol/style';
import {fromLonLat} from 'ol/proj';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {
  // @Output() location = new EventEmitter<string>();  
  constructor(public dialog: MatDialog) {}
  // address: string
  flag = false
  // ngOnInit(): void {
    // this.address = "usa 123 lt space"
  // }
  
  openDialog() {
    
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.flag = true
      // this.location.emit(result);
      console.log(`Dialog result: ${result}`);
    });
  }

}

// just an interface for type safety.
// interface marker {
	// lat: number;
	// lng: number;
	// label?: string;
	// draggable: boolean;
// }


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',  
  styleUrls: ['./map-dialog.component.css']

})
export class DialogContentExampleDialog implements AfterViewInit{
  map: Map;
  vectorLayer: any;
  rasterLayer: any;
  coordinate: any = [];

  ngAfterViewInit() {
    this.showMap();
  }

  getCoord(event: any){
  //   console.log('getCoords called', event)
  //   this.coordinate = this.map.getEventCoordinate(event);
  //   var layer = new VectorLayer({
  //     source: new VectorSource({
  //         features: [
  //             new Feature({
  //                 geometry: new Point(fromLonLat([event.screenX, event.screenY]))
  //             })
  //         ]
  //     })
  // });
  // this.map.addLayer(layer);

    // console.log("coordinate: ", this.coordinate);
    // var iconFeature = new Feature({
    //   geometry: new Point(coordinate),
    //   name: 'Null Island',
    //   // population: 4000,  
    //   // rainfall: 500,
    // });
    // var vectorSource = new VectorSource({
    //   features: [iconFeature],
    // });
    // var vectorLayer = new VectorLayer({
    //   source: vectorSource,
    // });
    



 }

  showMap()
  {
    // var iconFeature = new Feature({
    //   geometry: new Point([0,0]),
    //   name: 'Null Island',
    //   population: 4000,  
    //   rainfall: 500,
    // });

    // var iconStyle = new Style({
    //   image: new Icon({
    //     anchor: [0.5, 46],
    //     anchorXUnits: 'fraction',
    //     anchorYUnits: 'pixels',
    //     src: 'assets/img/icon.png',
    //   }),
    // });

    // iconFeature.setStyle(iconStyle);

    // var vectorSource = new VectorSource({
    //   features: [iconFeature],
    // });
    // var vectorLayer = new VectorLayer({
    //   source: vectorSource,
    // });

    this.map = new Map({
      target: document.getElementById('map'),
      layers: [
        new TileLayer({
          // source: new XYZ({
          //   url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          // })
          source: new TileJSON({
            url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
            crossOrigin: '',
          }),
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
      // controls: defaultControls().extend([
      //   new ZoomToExtent({
      //     extent: [
      //       813079.7791264898, 5929220.284081122,
      //       848966.9639063801, 5936863.986909639
      //     ]
      //   })
      // ])
    });
    // var element = document.getElementById('popup');
    // var popup = new Overlay({
    //   element: element,
    //   positioning: 'bottom-center',
    //   stopEvent: false,
    //   offset: [0, -50],
    // });
    // this.map.addOverlay(popup);

    // this.map.on('click', (evt) => {
    //   console.log("clicked", evt)
    //   var feature = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
    //     return feature;
    //   });
    //   if (feature) {console.log("feature", feature)
    //     var coordinates = feature.getGeometry().getCoordinates();
    //     popup.setPosition(evt.coordinate);
    //     // $(element).popover({
    //     //   placement: 'top',
    //     //   html: true,
    //     //   content: feature.get('name'),
    //     // });
    //     // $(element).popover('show');
    //   }
    // });
  //   var layer = new VectorLayer({
  //     source: new VectorSource({
  //         features: [
  //             new Feature({
  //                 geometry: new Point(fromLonLat([0, 0]))
  //             })
  //         ]
  //     })
  // });
  // this.map.addLayer(layer);

  this.map.on('click', (evt) => {
    console.log("evt", evt);
    
    var layer = new VectorLayer({
      source: new VectorSource({
          features: [
              new Feature({
                  geometry: new Point(fromLonLat(evt.pixel))
              })
          ]
      })
  });
  this.map.addLayer(layer);
  })

  }

}
