// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we import our newly created user services
import usersService from '../services/users.service';

// we import the argon2 library for password hashing
import argon2 from 'argon2';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

import { PatchUserDto } from '../dto/patch.user.dto';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersService.list(100, 0);
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.readById(req.params.userId);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await usersService.create(req.body);
    res.status(201).send({ id: userId });
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await usersService.patchById(req.params.userId, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await usersService.putById(req.params.userId, req.body));
    res.status(204).send();
  }

  async removeUser(req: express.Request, res: express.Response) {
    log(await usersService.deleteById(req.params.userId));
    res.status(204).send();
  }

  async updatePermissionLevel(req: express.Request, res: express.Response) {
    const patchUserDto: PatchUserDto = {
      permissionLevel: parseInt(req.params.permissionLevel),
    };
    log(await usersService.patchById(req.params.userId, patchUserDto));
    res.status(204).send();
  }
}

export default new UsersController();
