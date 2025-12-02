import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumoService } from './consumo.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { UpdateConsumoDto } from './dto/update-consumo.dto';

@Controller('consumo')
export class ConsumoController {
  constructor(private readonly consumoService: ConsumoService) {}

  @Post()
  create(@Body() createConsumoDto: CreateConsumoDto) {
    return this.consumoService.create(createConsumoDto);
  }

  @Get()
  findAll() {
    return this.consumoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumoDto: UpdateConsumoDto) {
    return this.consumoService.update(+id, updateConsumoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumoService.remove(+id);
  }
}
