import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./pages/home/home.component").then((c) => c.HomeComponent)
    },
    {
        path: 'recipe/:id',
        loadComponent: () => import("./pages/recipe/recipe.component").then((c) => c.RecipeComponent)
    }
];
