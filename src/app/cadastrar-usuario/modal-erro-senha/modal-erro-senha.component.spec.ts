import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErroSenhaComponent } from './modal-erro-senha.component';

describe('ModalErroSenhaComponent', () => {
  let component: ModalErroSenhaComponent;
  let fixture: ComponentFixture<ModalErroSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErroSenhaComponent]
    });
    fixture = TestBed.createComponent(ModalErroSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
