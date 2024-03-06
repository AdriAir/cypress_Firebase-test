import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from 'src/app/services/hero/hero.service';
import { Hero } from 'src/app/interfaces/hero';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (name) {
      this.heroService.addHero({ name } as Hero).subscribe((hero) => {
        this.heroes.push(hero);
      });
    }
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((heroToFilter) => heroToFilter !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
