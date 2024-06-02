import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-fetch',
  templateUrl: './data-fetch.component.html',
  styleUrl: './data-fetch.component.scss'
})
export class DataFetchComponent implements OnInit {

  data: any;
  summary: any = {};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(response => {
      this.data = response;
    });
    
    let job:string[] = [];
    this.data.users.forEach((item: any) => {

      if (job.length == 0 || !job?.includes(item.company.department)) {

        //init new job
        job.push(item.company.department);

        this.summary[item.company.department] = {
          male: item.gender == "male" ? 1 : 0,
          female: item.gender == "female" ? 1 : 0,
          ageRange: String(item.age)+"-"+String(item.age),
          hair: {
            [item.hair.color]: 1
          },
          addressUser: {
            [item.firstName+item.lastName]: item.address.postalCode
          }
        };

      }
      else{
        if (job?.includes(item.company.department)) {

          //update gender
          if (item.gender == "male") {
            this.summary[item.company.department].male++;
          }else if(item.gender == "female"){
            this.summary[item.company.department].female++;
          }
          
          //update age length
          let lengthAge = this.summary[item.company.department].ageRange.split("-");
          if (item.age < Number(lengthAge[0])) {
            this.summary[item.company.department].ageRange = String(item.age)+"-"+String(lengthAge[1]);
          }else if (item.age > Number(lengthAge[1])){
            this.summary[item.company.department].ageRange = String(lengthAge[0])+"-"+String(item.age);
          }

          //update hair color list
          if (Object.keys(this.summary[item.company.department].hair).includes(item.hair.color)) {
            this.summary[item.company.department].hair[item.hair.color] += 1
          }else{
            this.summary[item.company.department].hair[item.hair.color] = 1
          }

          //add user address
          this.summary[item.company.department].addressUser[item.firstName+item.lastName] = item.address.postalCode
        }
      }

    });
  }
}
