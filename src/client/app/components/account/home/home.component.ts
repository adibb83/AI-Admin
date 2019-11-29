import { Component, AfterViewInit } from "@angular/core";
import { Router } from '@angular/router';
import { GlobalParamsService } from '../../../services/globalParams.service';
import 'homeAnimation';
declare var homePageAnimation: any;
// import "gsap";
// declare var TimelineMax:any;
// declare var Power2:any;

@Component({
    moduleId: module.id,
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'

})



export class HomeComponent implements AfterViewInit {
    private userEmail: string = '';
    private showError: boolean = false;
    constructor(private _router: Router, private _globalParamsService: GlobalParamsService) { }

    goToRegister() {
        this._router.navigate(['/account/register']);
    }

    setNewUserEmail(valid: boolean) {
        if (valid){
            this._globalParamsService.registerEmail = this.userEmail;
            this.showError=false;
            this.goToRegister();
        }
        else{
            this.showError=true;
        }

    }

    ngAfterViewInit() {
        new homePageAnimation();
    }

}


//GRAVEYARD===================================================================================================
 // private url = "http://uk-dolores.sensiya.com/api/telechatbot/homepagecall/?destPhonenumber="
   // private appand: string = "";
   // @ViewChild('callmeButton') callmeButton: ElementRef;
    //@ViewChild('homeContainer') homeContainer: ElementRef;
   // private dynamicTargets = ['#section1', '#section2', '#section3', '#section4'];
   // sectionNum = 0;
   // private canScroll: boolean = true;
//private calling: boolean = false;


// sendNumber(valid: boolean, value: any) {
    //     if (valid) {
    //         this.calling = true;
    //         this.appand = this.url + this.callNumber;
    //         this.callmeButton.nativeElement.disabled = true;

    //         setTimeout(() => {
    //             this.appand = "";
    //             this.callmeButton.nativeElement.disabled = false;
    //             this.calling = false;
    //         }, 6000);

    //     }

    // }


    // mouseWheelUpFunc(event: any) {

    //     if (this.dynamicTargets[this.sectionNum - 1] && this.canScroll) {
    //         this.canScroll = false;
    //         this.sectionNum -= 1;
    //         this.scroll(this.sectionNum);
    //         if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
    //             this.addAnimationClass('slideDown', this.sectionNum, this.sectionNum + 1)
    //         }
    //         setTimeout(() => {
    //             this.removeClassFromAllElements('slideDown')
    //             this.canScroll = true;
    //         }, 800);

    //     }
    // }


    // mouseWheelDownFunc(event: any) {
    //     if (this.dynamicTargets[this.sectionNum + 1] && this.canScroll) {
    //         this.canScroll = false;
    //         this.sectionNum += 1;
    //         this.scroll(this.sectionNum);
    //         if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
    //             this.addAnimationClass('slideUp', this.sectionNum, this.sectionNum - 1)
    //         }
    //         setTimeout(() => {
    //             this.removeClassFromAllElements('slideUp')
    //             this.canScroll = true;
    //         }, 800);
    //     }
    // }


    // public scroll(sectionNum: number) {
    //     // this.activatedRoute.fragment.subscribe(f => {
    //     //     const element = document.querySelector(this.dynamicTargets[this.sectionNum])
    //     //     if (element) element.scrollIntoView({ block: "start", behavior: "smooth" })
    //     // });

    //     // console.log(sectionNum);
    //     //  window.location.hash = '#section'+sectionNum;

    //     const element = document.querySelector(this.dynamicTargets[this.sectionNum])
    //     if (element) element.scrollIntoView({ block: "start", behavior: "smooth" })
    // }

    // removeClassFromAllElements(className: string) {
    //     var sections = document.getElementsByTagName('section')
    //     for (var i = 0; i < sections.length; ++i) {
    //         if (sections[i].className === className) {
    //             sections[i].classList.remove(className);
    //         }
    //     }
    // }

    // addAnimationClass(className: string, currentSection: number, lastSection: number) {
    //     var sections = document.getElementsByTagName('section')
    //     sections[currentSection].classList.add(className);
    //     sections[lastSection].classList.add(className);

    // }