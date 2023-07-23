import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { App } from './app/entities/app.entity';
import { GetPagination } from './app/dto/app.paginated';
import { AppCreateArg } from './app/dto/app.create';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.apps = []
  }

  apps: App[]

  @Get()
  async getHello(
    @Query() queryParams: GetPagination
  ) {
    return this.appService.getAll();
  }

  @Get("/:id")
  getById(
    @Param('id') id
  ) {
    return this.appService.getById(id)
  }

  @Post()
  postHello(
    @Body() newData: AppCreateArg
  ) {
    return this.appService.create(newData);
  }

  @Delete("/:id")
  async deleteHello(
    @Param('id') id
  ) {
    return this.appService.delete(id);
  }

  @Put("/:id")
  async updateHello(
    @Param('id') id,
    @Body() newEl: Partial<App>
  ) {

    this.appService.update(id, newEl)
  }
}
