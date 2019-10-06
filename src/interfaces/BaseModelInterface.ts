import * as Sequelize from 'sequelize';
import { ModelsInterface } from './ModelsInterface';

export interface BaseModelInterface {
  prototype?: any;
  associate?(models: ModelsInterface): void;
}
