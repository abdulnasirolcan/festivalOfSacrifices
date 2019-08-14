import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-excel-export',
  template: `
    <p>
      <button (click)="exportButtonHandler()" (wscclick)="wscclick.emit()">
        Export Data</button
      ><br />
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExcelExportComponent),
      multi: true,
    },
  ],
})
export class ExcelExportComponent {
  @Output()
  wscclick = new EventEmitter<MouseEvent>();

  constructor(private excelExportService: IgxExcelExporterService) {}

  exportButtonHandler(data) {
    this.excelExportService.exportData(data, new IgxExcelExporterOptions('ExportFileFromData'));
  }
}
