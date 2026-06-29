import { handle } from 'hono/cloudflare-pages';
import api from '../../src/backend';

export const onRequest = handle(api);
