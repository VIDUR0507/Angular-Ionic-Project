import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProductViewPage } from './user-product-view.page';

describe('UserProductViewPage', () => {
  let component: UserProductViewPage;
  let fixture: ComponentFixture<UserProductViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserProductViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
