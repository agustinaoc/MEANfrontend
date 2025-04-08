import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
  { path: 'recipe/:id', loadComponent: () => import('./components/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent) },
  { path: 'add', loadComponent: () => import('./components/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent) },
];
