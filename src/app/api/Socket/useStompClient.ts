// hooks/useStompClient.ts
import { WS_PREFIX } from "@/constants/appConstant";
import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";
import SockJS from "sockjs-client";

export function useStompClient() {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: undefined,
      webSocketFactory: () => new SockJS(WS_PREFIX),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      // debug: (str) => console.log("[STOMP]", str),
    });

    stompClient.onConnect = () => {
      console.log("[STOMP] Connected");
      setConnected(true);
    };

    // stompClient.onStompError = (frame) => {
    stompClient.onStompError = () => {
      console.error("[STOMP] Broker Error", frame);
    };

    setClient(stompClient);

    return () => {
      stompClient.deactivate();
      setConnected(false);
    };
  }, []);

  const connect = useCallback(() => {
    if (client && !connected) {
      client.activate();
    }
  }, [client, connected]);

  return { client, connected, connect };
}
