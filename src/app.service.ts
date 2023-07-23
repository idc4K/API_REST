import { Injectable, NotFoundException } from '@nestjs/common';
import { App } from './app/entities/app.entity';
import { AppCreateArg } from './app/dto/app.create';

@Injectable()
export class AppService {
  constructor() {
    this.apps = []
  }
  apps: App[]

  /**
   * Get all function
   * @returns 
   */
  async getAll(

  ): Promise<App[]> {
    return this.apps
  }

  /**
   * Create function
   * @param newData 
   * @returns 
   */
  async create(
    newData: AppCreateArg
  ): Promise<App> {
    const data = new App()
    const { designation, name } = newData

    data.designation = designation
    data.name = name

    if (this.apps.length) {
      data.id = this.apps[this.apps.length - 1].id + 1; //Increment id 
    }
    else {
      data.id = 1;
    }

    this.apps.push(data); // App new data in apps array

    const value = this.apps.map(e => console.log("Element:::::::::::::", e.designation.substring(0, 2), e.designation.trimEnd()));

    // console.log(value);
    return data;
  }

  /**
   * Get by id function
   * @param id 
   * @returns 
   */
  async getById(id): Promise<App> {
    const element = this.apps.find((e) => e.id === +id);
    if (element)
      return element;
    throw new NotFoundException(`Id doesn't exist`);
  }

  /**
   * Update function
   * @param id 
   * @param newEl 
   * @returns 
   */
  async update(
    id: number,
    newEl: Partial<App>,

  ): Promise<App> {
    const firstTodo = this.getById(id);

    (await firstTodo).designation = newEl.designation ? newEl.designation : (await firstTodo).designation;
    (await firstTodo).name = newEl.name ? newEl.name : (await firstTodo).name;

    console.log(id, newEl);

    return firstTodo;
  }

  /**
   * Delete function
   * @param id 
   * @returns 
   */
  async delete(
    id: number
  ) {
    const index = this.apps.findIndex((d) => d.id === +id);

    if (index >= 0) {
      await this.apps.splice(index, 1);

    } else {
      throw new NotFoundException(`L'${id} n'existe pas`)
    }

    return {
      message: `L'App ${id} à été supprimé avec succès`,
      count: 1
    }
  }
}
