import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit{

  meal: any = null;
  loading = false;
  error: string | null = null;

  timerSeconds = 0;
  timerRunning = false;
  showTimer = true;
  timerInterval: any;

  constructor(
    private mealService: MealService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMeal(id);
    }
  }

  loadMeal(id: string): void {
    this.loading = true;
    this.error = null;

    this.mealService.getId(id).subscribe({
      next: res => {
        this.meal = res.meals?.[0] || null;
        this.loading = false;

        if (!this.meal) {
          this.error = 'Receita não encontrada.';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Erro ao carregar a receita.';
      }
    });
  }

  getTagsArray(tags: string): string[] {
    return tags ? tags.split(',') : [];
  }

  getIngredientsList(): {
    index: number;
    name: string;
    measure: string;
    checked: boolean;
  }[] {
    const list: any[] = [];

    for (let i = 1; i <= 20; i++) {
      const name = this.meal?.[`strIngredient${i}`];
      const measure = this.meal?.[`strMeasure${i}`];

      if (name && name.trim()) {
        list.push({
          index: i,
          name,
          measure,
          checked: false
        });
      }
    }

    return list;
  }

  getIngredientsCount(): number {
    return this.getIngredientsList().length;
  }

  getFormattedInstructions(): string {
    return this.meal?.strInstructions?.replace(/\r\n/g, '<br>') || '';
  }

  getYouTubeEmbedUrl(url: string): string {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  toggleTimer(): void {
    this.timerRunning = !this.timerRunning;

    if (this.timerRunning) {
      this.timerInterval = setInterval(() => {
        this.timerSeconds++;
      }, 1000);
    } else {
      clearInterval(this.timerInterval);
    }
  }

  formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  printRecipe(): void {
    window.print();
  }

  saveRecipe(): void {
    // Pode implementar salvamento com localStorage
    alert('Receita salva (exemplo).');
  }

  shareRecipe(): void {
    navigator.clipboard.writeText(window.location.href);
    alert('Link da receita copiado!');
  }

  addToShoppingList(): void {
    const selected = this.getIngredientsList().filter(i => i.checked);
    if (selected.length === 0) {
      alert('Nenhum ingrediente selecionado.');
      return;
    }

    // Simulação de envio à lista
    console.log('Selecionados para lista:', selected);
    alert(`${selected.length} ingrediente(s) adicionados à lista de compras.`);
  }

  trackByIngredient(index: number, item: any) {
    return item.index;
  }

}
