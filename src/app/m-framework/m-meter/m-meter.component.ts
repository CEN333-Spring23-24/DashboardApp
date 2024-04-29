import { Component, OnInit, Input } from '@angular/core';
import * as HighCharts from "highcharts";
import More from 'highcharts/highcharts-more';
More(HighCharts);

@Component({
  selector: 'm-meter',
  standalone: true,
  imports: [],
  templateUrl: './m-meter.component.html',
  styleUrl: './m-meter.component.css'
})
export class MMeterComponent implements OnInit{
  @Input() value: number;
  @Input() unit: string;
  @Input() min: number;
  @Input() max: number;
  constructor(){
    this.value = 80;
    this.unit = "km/h";
    this.min = 0;
    this.max = 100;
  }
  ngOnInit() {
    // @ts-ignore
    HighCharts.chart('container', {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '100%'
    },
    title: {
      text: ''
  },
  pane: {
    startAngle: -90,
    endAngle: 89.9,
    background: null,
    center: ['50%', '75%'],
    size: '80%'
},

// the value axis
yAxis: {
    min: this.min,
    max: this.max,
    tickPixelInterval: 72,
    tickPosition: 'inside',
    tickColor:  '#FFFFFF',
    tickLength: 20,
    tickWidth: 2,
    minorTickInterval: null,
    labels: {
        distance: 20,
        style: {
            fontSize: '14px'
        }
    },
    lineWidth: 0,
    plotBands: [{
        from: this.min,
        to: Math.floor((this.max-this.min)/3),
        color: '#55BF3B', // green
        thickness: 20
    }, {
        from: Math.floor((this.max-this.min)/3),
        to: Math.floor((this.max-this.min)/3)*2,
        color: '#DDDF0D', // yellow
        thickness: 20
    }, {
        from: Math.floor((this.max-this.min)/3)*2,
        to: this.max,
        color: '#DF5353', // red
        thickness: 20
    }]
},

series: [{
  data: [this.value],
  tooltip: {
      valueSuffix: ' '+this.unit
  },
  dataLabels: {
      format: '{y} '+this.unit,
      borderWidth: 0,
      color: (
          HighCharts.defaultOptions.title &&
          HighCharts.defaultOptions.title.style &&
          HighCharts.defaultOptions.title.style.color
      ) || '#333333',
      style: {
          fontSize: '16px'
      }
  },
  dial: {
      radius: '80%',
      backgroundColor: 'gray',
      baseWidth: 12,
      baseLength: '0%',
      rearLength: '0%'
  },
  pivot: {
      backgroundColor: 'gray',
      radius: 6
  }

}]

});
  } 
}
