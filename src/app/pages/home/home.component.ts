import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(
    private mealService: MealService
  ){}

  categorias: any[] = [];
  random: any = null;
  meals: any[] = []

  ngOnInit(): void {
      this.listar()
  }

  listar() {
    this.mealService.categorias().subscribe({
      next: res => {
        this.categorias = res.categories;
      }
    })

    this.mealService.random().subscribe({
      next: res => {
        this.random = res.meals[0];
        
      }
    })

    this.mealService.list().subscribe({
      next: res => {
        this.meals = res.meals;
        console.log(res);
        
      }
    })
  }
}
