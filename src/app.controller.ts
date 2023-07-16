import { Body, Controller, Get, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { App } from './app/entities/app.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.apps = []
  }

  apps: App[]

  @Get()
  getHello(

  ) {
    return this.apps;
    // return this.appService.getHello();
  }

  @Get("/:id")
  getById(
    @Param('id') id
  ) {
    const element = this.apps.find((e) => e.id === +id);
    if (element)
      console.log("element:::::::::::::::::::", element);
    // return element;
    // throw new NotFoundException(`Page Not Found`);
  }

  @Post()
  postHello(
    @Body() newData: App
  ) {

    if (this.apps.length) {
      newData.id = this.apps[this.apps.length - 1].id + 1; //Increment id 
    }
    else {
      newData.id = 1;
    }

    this.apps.push(newData); // App new data in apps array

    const value = this.apps.map(e => console.log("Element:::::::::::::", e.designation.substring(0, 2), e.designation.trimEnd()));

    // console.log(value);
    return newData;

  }
}
