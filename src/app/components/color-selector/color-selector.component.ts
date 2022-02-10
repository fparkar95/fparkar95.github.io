import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Color, ColorData, MockColorsResponse  } from 'src/app/models/colors';
import { GuessFeedback } from 'src/app/models/responses';
import { ColorsService } from 'src/app/services/colors.service';
import { DataStoreService } from 'src/app/services/data-store.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit, OnDestroy {

  
  options: Color[];
  correctColor: Color; 
  correctHex: string;
  feedback: GuessFeedback;
  numOfTries: number = 1;
  score: number = 0;
  isShare: boolean = false;
  private mockUrl: string = 'assets/data.json';
  disabledOptions: Color[] = []
  sub:Subscription

  public score$: Observable<number>;

  
  constructor(private colorService: ColorsService,
              private dataStore: DataStoreService) { }
  ngOnInit(): void {

    this.score$ = this.dataStore.score$;
    //TODO: Uncomment when api is required/ready, use mock until then
    //this.loadApiData()
    this.loadMockData();
  }

  private loadApiData(){
    this.colorService.getColors().subscribe((res: ColorData) =>{
      this.options = res.options;
      this.correctColor = res.correctAnswer;
      this.correctHex = `#${res.correctAnswer.hex}`;
    })

    this.numOfTries = 1; //should reset when new color is loaded
    this.feedback = new GuessFeedback();
  }

  private loadMockData(){

    this.sub = this.score$.subscribe(val => this.score = val);

    this.numOfTries = 1; //should reset when new color is loaded
    //if page is refreshed
    if(this.score == 0 && localStorage["score"]){
      this.score = new Number(localStorage.getItem('score')).valueOf(); 
      this.numOfTries = new Number(localStorage.getItem('numOfTries')).valueOf();
    }
    
    //TODO: localstorage for colors and disabled options 
    this.colorService.getColorsFromFile(this.mockUrl).subscribe((res: MockColorsResponse) =>{
      this.options = res.options;
      this.correctColor = res.correctAnswer;
      this.correctHex = `#${res.correctAnswer.hex}`;
    }); 
    
    this.feedback = new GuessFeedback();
    this.sub.unsubscribe();
  }


  optionSelected(entry: Color){
    
    if(entry.hex === this.correctColor.hex){
      this.disabledOptions = [];
      this.dataStore.calculateScore(this.score,this.numOfTries);

      Swal.fire({
        title: 'CORRECT!!!',
        html: `<h3>${this.feedback.compliment}</h3>
               <h4>The correct answer is ${this.correctColor.name}</h4>`,
        icon: 'success',
        confirmButtonText: 'Next!',
        allowOutsideClick: false
      }).then(async (result) => {
        if (result.value) {
          //TODO: Uncomment when api is required/ready, use mock until then
          //this.loadApiData();
          this.loadMockData();
        }
      });
    }
    else if(this.numOfTries >= 3 && entry.hex !== this.correctColor.hex){
      
      this.disabledOptions = [];
      
      Swal.fire({
        title: 'WRONG!!!',
        html: `<h3>${this.feedback.insult}</h3>
              <h4>The correct answer is ${this.correctColor.name}</h4>`,
        icon: 'error',
        confirmButtonText: 'Try Again?',
        showCancelButton: true,
        cancelButtonText: "Share",
        cancelButtonColor: "green",
        allowOutsideClick: false
      }).then(async (result) => {
        if(result.dismiss === Swal.DismissReason.cancel){
          this.isShare = true;
        }
        if (result.value) {
          this.restart();
        }
      });
    }
    else{
      this.numOfTries++;
      localStorage.setItem("numOfTries", this.numOfTries.toString());
      this.disabledOptions.push(entry);
      localStorage.setItem("disabledOptions", JSON.stringify({data: this.disabledOptions}));
    }
  }


  restart(){
    this.isShare = false;
    this.numOfTries = 1;
    localStorage.clear();
    this.dataStore.setScore(0);
    
    //TODO: Uncomment when api is required/ready, use mock until then
    //this.loadApiData();
    this.loadMockData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openInfoDialog(){
    Swal.fire({
      title: 'Instructions',
      html: `<h3 style="font-weight:bolder;" >Guess as many colors in a row!</h3>
              <h4 style="font-weight:bolder; color:green;">Attempt #1 = 5 points</h4>
              <h4 style="font-weight:bolder; color:blue;">Attempt #2 = 2 points</h4>
              <h4 style="font-weight:bolder; color:orange;">Attempt #3 = 1 point</h4>`,
      icon: 'question',
      confirmButtonText: 'Got it!',
      allowOutsideClick: false,
      showCloseButton: true
    })
    .then(async (result) => {
      result.isConfirmed;
    });
  }
}
