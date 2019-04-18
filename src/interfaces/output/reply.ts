/**
 * @module Telegrafer
 */

import { CallApi } from './callApi';

export interface Reply {
  reply(): CallApi;
}
