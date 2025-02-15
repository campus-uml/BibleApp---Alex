import { describe, it, expect, vi } from "vitest";
import { useActions } from "../../Hooks/useActions";

describe("useActions", () => {
  it("deberia copiar y alertar", async () => {
    const { copyToClipboard } = useActions();
    const text = "Hello, World!";

    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });
    const alertMock = vi.fn();
    window.alert = alertMock;

    await copyToClipboard(text);

    expect(writeTextMock).toHaveBeenCalledWith(text);
    expect(alertMock).toHaveBeenCalledWith("Texto copiado al portapapeles");
  });

  it("debería abrir la URL de compartir en WhatsApp en una nueva pestaña", () => {
    const { shareToWhatsApp } = useActions();
    const text = "¡Hola, Mundo!";
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;

    const openMock = vi.fn();
    window.open = openMock;

    shareToWhatsApp(text);

    expect(openMock).toHaveBeenCalledWith(whatsappUrl, "_blank");
  });
});
