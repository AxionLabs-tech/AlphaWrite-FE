"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { buildUrl, setDowntimeSignal } from "@/services/apiClient";

const POLL_INTERVAL_MS = 30_000;
const STATUS_PATH = "/api/v1/system-status";

type SystemStatusResponse = {
  downtime?: boolean;
  banner?: boolean;
  message?: string;
  updated_at?: string;
};

export type SystemStatusValue = {
  downtime: boolean;
  banner: boolean;
  message: string;
  loading: boolean;
};

const DEFAULT_VALUE: SystemStatusValue = {
  downtime: false,
  banner: false,
  message: "",
  loading: true,
};

const SystemStatusCtx = createContext<SystemStatusValue>(DEFAULT_VALUE);

export function SystemStatusProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<SystemStatusValue>(DEFAULT_VALUE);
  const abortRef = useRef<AbortController | null>(null);

  const fetchStatus = useCallback(async () => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch(buildUrl(STATUS_PATH), {
        method: "GET",
        signal: ctrl.signal,
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as SystemStatusResponse;
      setValue({
        downtime: data.downtime === true,
        banner: data.banner === true,
        message: typeof data.message === "string" ? data.message : "",
        loading: false,
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      // Fail-open: a broken status endpoint must not blackhole the UI.
      setValue({ downtime: false, banner: false, message: "", loading: false });
    }
  }, []);

  useEffect(() => {
    void fetchStatus();
    const id = window.setInterval(() => void fetchStatus(), POLL_INTERVAL_MS);
    const onFocus = () => void fetchStatus();
    const onOnline = () => void fetchStatus();
    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onOnline);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onOnline);
      abortRef.current?.abort();
    };
  }, [fetchStatus]);

  useEffect(() => {
    setDowntimeSignal(() => value.downtime);
    return () => setDowntimeSignal(null);
  }, [value.downtime]);

  return (
    <SystemStatusCtx.Provider value={value}>{children}</SystemStatusCtx.Provider>
  );
}

export function useSystemStatus(): SystemStatusValue {
  return useContext(SystemStatusCtx);
}
