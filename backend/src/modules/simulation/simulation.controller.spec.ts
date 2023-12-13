import { Test, TestingModule } from '@nestjs/testing';
import { SimulationController } from './simulation.controller';
import { SimulationService } from './simulation.service';

describe('AppController', () => {
  let controller: SimulationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SimulationController],
      providers: [SimulationService],
    }).compile();

    controller = app.get<SimulationController>(SimulationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe('Hello World!');
    });
  });
});
