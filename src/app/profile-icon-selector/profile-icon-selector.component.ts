import { Component, forwardRef, Provider } from '@angular/core';
import { profileIconNames } from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PROFILE_ICON_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
  multi: true
};


@Component({
  selector: 'con-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrls: ['./profile-icon-selector.component.css'],
  providers: [PROFILE_ICON_VALUE_ACCESSOR]
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {
  profileIconNames = profileIconNames;
  showAllIcons: boolean = true;
  selectedIcon!: string | null;

  private onChange!: Function;
  private onTouched!: Function;

  //purpose: updating element in html when value of formcontrol changes
  writeValue(icon: string | null): void {
      this.selectedIcon = icon;
      if(icon && icon !== ''){
        this.showAllIcons = false;
      }else{
        this.showAllIcons = true;
      }
  }

  //update form control when icon is selected //events make class updates
  registerOnChange(fn: Function): void {
      this.onChange = (icon: string) =>{
        fn(icon);
      }
  }
//purpose know if control has been touched for validation purposes
  registerOnTouched(fn: Function): void {
      this.onTouched = fn;
  }

  selectIcon(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
    this.onChange(icon);
  }
}
