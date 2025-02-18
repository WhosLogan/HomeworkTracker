import {sessionMiddleware, protectPages} from "$lib/server/auth/auth"
import type { Handle } from "@sveltejs/kit";
import {sequence} from "@sveltejs/kit/hooks";

export const handle: Handle = sequence(sessionMiddleware, protectPages);