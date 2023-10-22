import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagensComponent } from './modal-mensagens.component';

describe('ModalMensagensComponent', () => {
  let component: ModalMensagensComponent;
  let fixture: ComponentFixture<ModalMensagensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMensagensComponent]
    });
    fixture = TestBed.createComponent(ModalMensagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
