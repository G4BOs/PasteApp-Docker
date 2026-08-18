import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "./types";

const URL = window.location.origin;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);
