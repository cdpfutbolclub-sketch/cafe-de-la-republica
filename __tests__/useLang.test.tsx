import { renderHook, act } from "@testing-library/react";
import { LangProvider, useLang } from "../hooks/useLang";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LangProvider>{children}</LangProvider>
);

test("defaults to Catalan", () => {
  const { result } = renderHook(() => useLang(), { wrapper });
  expect(result.current.lang).toBe("ca");
});

test("t() returns Catalan field by default", () => {
  const { result } = renderHook(() => useLang(), { wrapper });
  expect(result.current.t({ ca: "Hola", en: "Hello" })).toBe("Hola");
});

test("toggleLang switches to English", () => {
  const { result } = renderHook(() => useLang(), { wrapper });
  act(() => result.current.toggleLang());
  expect(result.current.lang).toBe("en");
});

test("t() returns English field after toggle", () => {
  const { result } = renderHook(() => useLang(), { wrapper });
  act(() => result.current.toggleLang());
  expect(result.current.t({ ca: "Hola", en: "Hello" })).toBe("Hello");
});

test("toggleLang switches back to Catalan", () => {
  const { result } = renderHook(() => useLang(), { wrapper });
  act(() => result.current.toggleLang());
  act(() => result.current.toggleLang());
  expect(result.current.lang).toBe("ca");
});
