import { Component, Input } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/app/model/property';

@Component({
  selector: 'app-property-card',
  templateUrl: 'property-card.component.html',
  styleUrls: ['property-card.component.css'],
})
export class PropertyCardComponent {
  public propertyList: Property[] = [];
  public mainPhotoUrl: string = null;
  constructor(private housingService: HousingService) {}
  @Input() property: IPropertyBase;
  @Input() hideIcons: boolean;

  deleteProperty(id) {
    if (confirm('Do you want to delete this property with this id?' + id)) {
      this.housingService.deleteProperty(id).subscribe((result) => {
        console.warn('deleted?', result);
      });
      window.location.reload();
    }
  }
}
