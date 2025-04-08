import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  recipe: Recipe = {
    name: '',
    description: '',
    ingredients: [],
    id: ''
  };

  ingredientsInput: string = '';

  constructor(private recipeService: RecipeService, private router: Router) {}

  onSubmit() {

    const newRecipe = {
      name: this.recipe.name,
      description: this.recipe.description,
      ingredients: this.ingredientsInput.split(',').map(i => i.trim()),
    };
  
    this.recipeService.addRecipe(newRecipe as any).subscribe({
      next: (res) => {
        alert('Recipe added!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding recipe:', err);
        alert('Failed to add recipe.');
      }
    });
  }
}
