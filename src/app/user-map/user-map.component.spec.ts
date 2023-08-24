import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMapComponent } from './user-map.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { JsondataService } from '../services/jsondata.service';

describe('UserMapComponent', () => {
  let service: JsondataService;
  let component: UserMapComponent;
  let fixture: ComponentFixture<UserMapComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMapComponent ],
      imports: [HttpClientTestingModule],
      providers: [JsondataService]
    })
    .compileComponents();

    service = TestBed.inject(JsondataService);
    fixture = TestBed.createComponent(UserMapComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display the h1 contect',()=>{
    const h1content = debugElement.query(By.css('.Headingfirst'));
    const h1Text = h1content.nativeElement.textContent.trim();
    const expectedContent = 'GalaxEye Project Solution';
    expect(h1Text).toEqual(expectedContent);
  });

  it('Should call Clear All method when button was clicked', ()=>{
    spyOn(component,'clearAll');
    const button =fixture.debugElement.query(By.css('.clickbutton'));
    button.nativeElement.click();
    expect(component.clearAll).toHaveBeenCalled();

  });

  it('Should call initMap() getJsonData() in ngOnInit()', ()=>{
     spyOn(component,"getJSONData");
     spyOn(component, "initMap");
     component.ngOnInit();
    expect(component.initMap).toHaveBeenCalled();
    expect(component.getJSONData).toHaveBeenCalled();

  });

});
