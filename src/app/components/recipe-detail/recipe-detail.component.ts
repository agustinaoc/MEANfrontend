import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})

export class RecipeDetailComponent {
  recipeId: string | null = null;
  recipe: Recipe | null = null;
  loading: boolean = true; 

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeId = params.get('id'); 

      console.log('Recipe ID from route:', this.recipeId);
      
      if (this.recipeId) {

        this.recipeService.getRecipeById(this.recipeId).subscribe({
          next: (data) => {
            console.log('Fetched Recipe:', data);
            this.recipe = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching recipe details:', err);
            this.loading = false;
          }
        });
      }
    });
  }
}