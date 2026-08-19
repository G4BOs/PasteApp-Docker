import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "./types";

export const isDebugMode = false

const URL = isDebugMode ? "https://192.168.88.221:8000" : window.location.origin

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);
