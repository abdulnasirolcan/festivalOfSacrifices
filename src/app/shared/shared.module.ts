import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import * as _components from './components';

const components = [_components.ExcelExportComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components],
})
export class SharedModule {}
