import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    objectkeys = Object.keys;
    data : String[]
    options : any
    keys : any
    constructor(private http: HttpClient) { }

    ngOnInit() {
        let columns = ['company','location','market','website','employees','stage','founders'];
        this.options = _.map(columns,(column)=>{
            if(column == 'company' || column == 'location'){
                return {value : column , isSelected : true};
            }else{
                return {value : column , isSelected : false};
            }
        });
        this.keys = _.filter(this.options,(o)=>{
            return o.isSelected;
        });
        console.log(this.keys);
        this.http.get('https://api.myjson.com/bins/eqm4p').subscribe(results => {
            this.data = results['companies'];
        });
    }
    shouldVisible(str){
        let tempkeys = this.options;
        let a = false;
        _.map(tempkeys,function(obj){
            if(str == obj.value && obj.isSelected === true){
                a = true;
            }
        });
        return a;
    }

    updateTable(event : any) {
        let val = event.target.value;
        _.map(this.options,function(obj){
            if(obj.value == val){
                obj.isSelected = event.target.checked;
            }
        });
        this.keys = _.filter(this.options,(o)=>{
            return o.isSelected;
        });
    }

    truncateString(str, num) {
        return str.length > num ?
        str.slice(0, num > 3 ? num - 3 : num) + "..." :
        str;
    }

}
