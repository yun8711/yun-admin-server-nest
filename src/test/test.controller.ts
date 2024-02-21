import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('test')
export class TestController {
  @Inject()
  private readonly redisService: RedisService;

  constructor(private readonly testService: TestService) {}

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @Get('redis')
  async testRedis() {
    return JSON.parse(await this.redisService.get('test'));
  }

  @Post('redis')
  setRedis(@Body() body: any) {
    console.log('body', body);
    return this.redisService.set('test', JSON.stringify(body));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
