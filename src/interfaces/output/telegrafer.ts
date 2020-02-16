/**
 * @module Update
 */

import { Action, Command, Hears } from './methods';

export type Telegrafer = Action & Command & Hears;
