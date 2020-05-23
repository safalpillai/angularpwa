import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: RootComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
