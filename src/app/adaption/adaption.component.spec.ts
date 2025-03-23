import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptionComponent } from './adaption.component';

describe('AdaptionComponent', () => {
  let component: AdaptionComponent;
  let fixture: ComponentFixture<AdaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdaptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
