import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondicionesService } from './condiciones.service';
import { CreateCondicionDto } from './dto/create-condicione.dto';
import { UpdateCondicioneDto } from './dto/update-condicione.dto';

@Controller('condiciones')
export class CondicionesController {
  constructor(private readonly condicionesService: CondicionesService) {}

  @Post()
  create(@Body() CreateCondicionDto: CreateCondicionDto) {
    return this.condicionesService.create(CreateCondicionDto);
  }

  @Get()
  findAll() {
    return this.condicionesService.findAll();
  }
    @Get('paciente/:pacienteId')
  findByPaciente(@Param('pacienteId') pacienteId: string) {
    return this.condicionesService.findByPacienteId(pacienteId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condicionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondicioneDto: UpdateCondicioneDto) {
    return this.condicionesService.update(id, updateCondicioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condicionesService.remove(id);
  }
}
