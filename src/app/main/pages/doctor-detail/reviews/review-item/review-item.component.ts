import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardReview') cardReview!: ElementRef<HTMLDivElement>;
  
  resizeObserver: ResizeObserver | undefined;

  isExpanding: boolean = false;
  isOverflowed: boolean | undefined;
  scrollHeight!: number ;
  showHeight!: number;

  constructor(
    private renderer: Renderer2,
    private zone: NgZone

  ) {}
  
  
 
  ngAfterViewInit(): void {
    const element = this.cardReview.nativeElement;

    // Listen Element Resize
    this.resizeObserver = new ResizeObserver(entries => {
      this.zone.run(() => {

        this.scrollHeight = entries[0].target.scrollHeight;
      
        if (this.scrollHeight > element.clientHeight && !this.isExpanding) {  // Check Overflow
          this.isOverflowed = true;
          this.showHeight = 200;

          this.renderer.addClass(element, 'card-less'); // Hidden and ... 
          this.renderer.addClass(element, 'overflowed');  // hover
    
        } else if (!this.isExpanding) {
          this.isOverflowed = false;
    
        }
  
        if (this.scrollHeight > element.clientHeight && this.isExpanding && this.isOverflowed) {
          this.showHeight = this.scrollHeight;
          // console.log("show ", this.showHeight )
        }
        
      })

    })

    this.resizeObserver.observe(element);
    // -0-0-0-

  }
  
  ngOnDestroy(): void {
    const element = this.cardReview.nativeElement;

    this.resizeObserver?.unobserve(element);
    this.resizeObserver?.disconnect();
  }

  expandReview() {
    

    if (this.isExpanding && this.isOverflowed) {    // card is opening

      this.isExpanding = false;

      this.showHeight = 200;

      this.renderer.addClass(this.cardReview.nativeElement, 'card-less')
    } else if (!this.isExpanding && this.isOverflowed) {   // card is closing 

      this.isExpanding = true;

      this.showHeight = this.scrollHeight;

      setTimeout(() => {
        this.renderer.removeClass(this.cardReview.nativeElement, 'card-less')
      }, 100);
      

    }
  }

  
}
