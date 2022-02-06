import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { Color, ColorData, MockColorsResponse } from 'src/app/models/colors';
import { GuessFeedback } from 'src/app/models/responses';
import { ColorsService } from 'src/app/services/colors.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit {

  
  options: Color[];
  correctColor: Color; 
  correctHex: string;
  feedback: GuessFeedback;
  correctCounter: number = 0;
  isShare: boolean = false;
  private mockUrl: string = 'assets/data.json';

  @Output() answerSelected = new EventEmitter<Answer>();
  
  constructor(private colorService: ColorsService) { }
  ngOnInit(): void {

    //TODO: Uncomment when api is required/ready, use mock until then
    //this.loadApiData();
    this.loadMockData();
  }

  private loadApiData(){
    this.colorService.getColors().subscribe((res: ColorData) =>{
      this.options = res.options;
      this.correctColor = res.correctAnswer;
      this.correctHex = `#${res.correctAnswer.hex}`;
    })

    this.feedback = new GuessFeedback();
  }

  private loadMockData(){
    this.colorService.getColorsFromFile(this.mockUrl).subscribe((res: MockColorsResponse) =>{
      this.options = res.options;
      this.correctColor = res.correctAnswer;
      this.correctHex = `#${res.correctAnswer.hex}`;
    })

    this.feedback = new GuessFeedback();
  }


  optionSelected(entry: Color){
    
    if(entry.hex === this.correctColor.hex){
      this.correctCounter++;
      Swal.fire({
        title: 'CORRECT!!!',
        html: `<h3>${this.feedback.compliment}</h3>
               <h4>The correct answer is ${this.correctColor.name}</h4>`,
        icon: 'success',
        confirmButtonText: 'Next!',
        showCancelButton: true,
        cancelButtonText: "Share",
        cancelButtonColor: "orange",
        allowOutsideClick: false
      }).then(async (result) => {
        if(result.dismiss === Swal.DismissReason.cancel){
          this.isShare = true;
        }
        if (result.value) {
          //TODO: Uncomment when api is required/ready, use mock until then
          //this.loadApiData();
          this.loadMockData();
        }
      });
    }
    else{
      Swal.fire({
        title: 'WRONG!!!',
        html: `<h3>${this.feedback.insult}</h3>
              <h4>The correct answer is ${this.correctColor.name}</h4>`,
        icon: 'error',
        confirmButtonText: 'Try Again?',
        showCancelButton: true,
        cancelButtonText: "Share",
        cancelButtonColor: "orange",
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
  }

  restart(){
    this.isShare = false;
    this.correctCounter = 0;
    
    //TODO: Uncomment when api is required/ready, use mock until then
    //this.loadApiData();
    this.loadMockData();
  }



 
}
