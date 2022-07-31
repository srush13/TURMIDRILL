import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs-3.2.7/canvasjs.min';
import { LoginAuthService } from '../services/login-auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public doughnutChartData: any = [0, 0, 0];
chartOptions = {
  responsive: true,
};
loginData:any;
  constructor(private login :LoginAuthService) { }

  ngOnInit(): void {
    this.loginData =this.login.loginData().data;
    console.log("this.loginData out==",this.loginData);
    this.doughnutChartData = [64,36];
    if(this.loginData.type==1){
      this.doughnutChart();
    }
    
  }
  public colors: Array<any> = [
    {
      backgroundColor: [ '#C7E317','#27339D'],
    },
  ];

  doughnutChart(){
    let y=[7,5]
    let dataPoints = [];
    let color=['#C7E317','#27339D'];
    for(var i =0;i<y.length;i++){
      dataPoints.push({
        y:y[i],
        color:color[i]
      })
    }
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      backgroundColor: "transparent",
      title: {
        text: "CNC 3D Printing",
        fontColor: "black",
        fontSize: 15,
        fontWeight: "lighter",
        horizontalAlign:'right',
        verticalAlign:'center'

      },
      axisY: {
        gridThickness: 0
      },
      dataPointWidth: 10,
      data: [{
        type: "doughnut",
        startAngle: 180,
        innerRadius: 90,
        dataPoints: dataPoints
      }],

    });

    chart.render();
  }
}
