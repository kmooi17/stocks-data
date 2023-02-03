import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    }
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
}
