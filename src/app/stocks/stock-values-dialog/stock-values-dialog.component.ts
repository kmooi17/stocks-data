import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { success, error } from 'src/app/app.component';
import { StockValues } from '../models/stock-values.interface';
import { Stock } from '../models/stock.interface';

@Component({
  selector: 'app-stock-values-dialog',
  templateUrl: './stock-values-dialog.component.html',
  styleUrls: ['./stock-values-dialog.component.scss'],
})
export class StockValuesDialogComponent implements OnInit {
  pageSizeOptions = [5, 10, 25, 100];
  stockValuesDisplayedColumns = ['stock_id', 'date', 'value'];

  @ViewChild(MatPaginator) stockValuesPaginator!: MatPaginator;
  @ViewChild(MatSort) stockValuesSort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      stockId: number;
      stocks: Stock[];
      stockValuesDataSource: MatTableDataSource<StockValues>;
    },
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.data.stockValuesDataSource.sort = this.stockValuesSort;
      this.data.stockValuesDataSource.paginator = this.stockValuesPaginator;
    });
  }

  applyStockValuesFilter(filterValue: any) {
    let value = filterValue.value;
    value = value.trim().toLowerCase();

    if (this.data.stockValuesDataSource) {
      this.data.stockValuesDataSource.filter = value;
    }
  }

  getStockName(id: number): string {
    const stock = this.data.stocks.find((s: Stock) => s.id === id);

    if (stock) {
      return stock.stock;
    }

    return '';
  }

  exportAsJson(): void {
    try {
      const jsonData = this.data.stockValuesDataSource.data.map(
        (values: StockValues) => {
          return {
            stock: this.getStockName(values.stock_id),
            date: values.date,
            value: values.value,
          };
        }
      );

      const jsonString = JSON.stringify(jsonData);
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/json;charset=UTF-8,' + encodeURIComponent(jsonString)
      );
      const fileName =
        jsonData[0].stock + '_' + new Date().toDateString() + '.json';
      element.setAttribute('download', fileName);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      this.snackbar.open(
        `Successfully downloaded ${fileName}`,
        undefined,
        success
      );
    } catch (err: unknown) {
      this.snackbar.open(`Failed to download file.`, undefined, error);
      console.log(err);
    }
  }
}
