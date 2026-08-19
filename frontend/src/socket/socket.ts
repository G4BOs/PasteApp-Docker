import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "./types";

const URL = window.location.origin; //"https://192.168.88.221:8000"

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);
