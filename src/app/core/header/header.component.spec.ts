import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { HeaderComponent } from './header.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';

let component: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;

let mockCDRef: any;
let mockAuthService: any;
let mockRouter: any;

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    mockCDRef = jasmine.createSpyObj('mockCDRef', ['markForCheck']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getAuth$', 'logout']);
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);

    mockAuthService.getAuth$.and.returnValue(Observable.of(null));

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ChangeDetectorRef, useValue: mockCDRef
        },
        {
          provide: AuthService, useValue: mockAuthService
        },
        {
          provide: Router, useValue: mockRouter
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });
});
