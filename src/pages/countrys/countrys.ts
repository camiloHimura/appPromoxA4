import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { ToolsProvider } from './../../providers/tools/tools';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { LocationProvider } from '../../providers/location/location';

@IonicPage()
@Component({
  selector: 'page-countrys',
  templateUrl: 'countrys.html',
})

export class CountrysPage {
  countrysArray: object[];
  countrySelected: string | boolean = false;
  departamentsArray: object[];
  departamentSelected: string | boolean = false;
  citysArray: object[];
  citySelected: string | boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tools: ToolsProvider,
              public locationProvider: LocationProvider,
              private firebase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.locationProvider.countrys
      .subscribe(data => this.countrysArray = data);
    this.locationProvider.departament$
      .subscribe(this.loadDepartaments);
    this.locationProvider.city$
      .subscribe(this.loadCitys);
  }

  selected(country:string, countrysArray: object[]){
    this.countrysArray = this.locationProvider.selectedCountry(country, countrysArray);
  }

  loadDepartaments = (data) => {
    this.countrySelected = data.name;
    this.countrysArray = this.countrysArray.map( (info:any) =>{
      if(info.name === this.countrySelected){
        info.departaments = data.departaments;
      }
      return info;
    })
    this.departamentsArray = data.departaments;
  }

  loadCitys = (data) => {
    this.departamentSelected = data.name;
    this.citysArray = data.citys;
    console.log(this.departamentSelected)
    console.log(this.citysArray)
  }

  goToCategorys(){
    this.navCtrl.push('CategorysPage');
  }

}
