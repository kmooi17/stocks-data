import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StockValues } from './stocks/models/stock-values.interface';
import { Stock } from './stocks/models/stock.interface';
import { StockValuesDialogComponent } from './stocks/stock-values-dialog/stock-values-dialog.component';
import { StockService } from './stocks/stock.service';

export const success = {
  panelClass: ['snack-bar', 'success'],
};

export const error = {
  panelClass: ['snack-bar', 'error'],
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  //#region Variables
  loading = false;
  pageSizeOptions = [5, 10, 25, 100];
  stockId = 0;
  stocks: Stock[] = [];

  stockDisplayedColumns = [
    'stock',
    'industry',
    'sector',
    'currency_code',
    'actions',
  ];
  stockDataSource: MatTableDataSource<Stock>;
  stockValuesDataSource: MatTableDataSource<StockValues>;

  @ViewChild(MatPaginator) stockPaginator!: MatPaginator;
  @ViewChild(MatSort) stockSort!: MatSort;
  //#endregion

  constructor(
    private stockService: StockService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.stockDataSource = new MatTableDataSource<Stock>([]);
    this.stockValuesDataSource = new MatTableDataSource<StockValues>([]);
  }

  ngAfterViewInit(): void {
    this.#getAllStocks();
  }

  applyStockFilter(filterValue: any) {
    let value = filterValue.value;
    value = value.trim().toLowerCase();

    if (this.stockDataSource) {
      this.stockDataSource.filter = value;
    }
  }

  viewValues(rowId: number): void {
    this.#getStockValues(rowId);
  }

  #getAllStocks(): void {
    this.loading = true;
    this.stockService.getAllStocks().subscribe({
      next: (res: Stock[]) => {
        this.stocks = res;
        this.stockDataSource = new MatTableDataSource(this.stocks);
        this.snackbar.open(`You've got stock!`, undefined, success);
      },
      error: (err: unknown) => {
        this.snackbar.open(
          `Something went wrong with retrieving your stocks`,
          undefined,
          error
        );
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        setTimeout(() => {
          if (this.stockDataSource) {
            this.stockDataSource.sort = this.stockSort;
            this.stockDataSource.paginator = this.stockPaginator;
          }
          this.loading = false;
        });
      },
    });
  }

  #getStockValues(id: number): void {
    this.loading = true;
    this.stockId = id;
    this.stockService.getStockValues(id).subscribe({
      next: (res: StockValues[]) => {
        this.stockValuesDataSource = new MatTableDataSource(res);

        this.snackbar.open(
          `You've got some useful stock values!`,
          undefined,
          success
        );

        this.dialog.open(StockValuesDialogComponent, {
          data: {
            stockId: this.stockId,
            stocks: this.stocks,
            stockValuesDataSource: this.stockValuesDataSource,
          },
          width: '100%',
        });
      },
      error: (err: unknown) => {
        this.snackbar.open(
          `Something went wrong with retrieving your stock values`,
          undefined,
          error
        );
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
