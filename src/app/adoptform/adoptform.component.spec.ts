import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptformComponent } from './adoptform.component';

describe('AdoptformComponent', () => {
  let component: AdoptformComponent;
  let fixture: ComponentFixture<AdoptformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
