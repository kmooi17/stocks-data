import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
  MatSnackBarConfig,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StockValuesDialogComponent } from './stocks/stock-values-dialog/stock-values-dialog.component';

const MATERIAL_MODULES = [
  // MatAutocompleteModule,
  MatButtonModule,
  // MatBadgeModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,
  // MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  // MatExpansionModule,
  MatFormFieldModule,
  // MatGridListModule,
  MatIconModule,
  MatInputModule,
  // MatListModule,
  // MatMenuModule,
  // MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  // MatProgressSpinnerModule,
  // MatRadioModule,
  // MatRippleModule,
  // MatSelectModule,
  // MatSidenavModule,
  // MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  // MatStepperModule,
  MatTableModule,
  // MatTabsModule,
  MatToolbarModule,
  // MatTooltipModule,
];

@NgModule({
  declarations: [AppComponent, StockValuesDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    HttpClientModule,
    MATERIAL_MODULES,
  ],
  exports: [CdkTableModule, MATERIAL_MODULES],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: <MatSnackBarConfig>{
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
