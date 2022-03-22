import { Router } from './deps.ts';
import userController from './user/user.controller.ts';
import HealthController from './health/health.controller.ts';

const healthController = new HealthController();

const users = new Router()
  .get('/', userController.getAll.bind(userController))
  .post('/', userController.add.bind(userController))
  .get('/:id', userController.get.bind(userController))
  .delete('/:id', userController.remove.bind(userController))
  .patch('/:id', userController.update.bind(userController))
  .put('/:id', userController.replace.bind(userController));

const healthCheck = new Router()
  .get('/', healthController.check.bind(healthController));

const router = new Router()
  .use('/users', users.routes(), users.allowedMethods())
  .use('/health-check', healthCheck.routes(), healthCheck.allowedMethods());

export default router;
