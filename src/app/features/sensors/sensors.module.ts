import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Ky026Component } from './ky026/ky026.component';
import { Mq2Component } from './mq2/mq2.component';

const routes: Routes = [
  { path: 'ky026', component: Ky026Component },
  { path: 'mq2', component: Mq2Component }
];

@NgModule({
  declarations: [
    Ky026Component,
    Mq2Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SensorsModule { }
