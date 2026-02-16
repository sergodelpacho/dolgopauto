function sendCartOrder() {
  const cart = getCart();
  if (!cart.length) return;

  const vin = (document.getElementById("orderVin")?.value || "").trim();
  const contact = (document.getElementById("orderContact")?.value || "").trim();

  const lines = cart.map(x => • ${x.title} ×${x.qty}${x.note ?  (${x.note}) : ""}).join("\n");
  const text =
Заказ с сайта DolgopAuto
Контакт: ${contact || "-"}
VIN/авто: ${vin || "-"}
Позиции:
${lines}

Прошу подтвердить цену и сроки.;

  openTelegramPrefill(text);
  openMailPrefill("Заказ с сайта DolgopAuto", text);
}

document.addEventListener("click", (e) => {
  const t = e.target;
  if (!(t instanceof HTMLElement)) return;

  if (t.matches("[data-cart-open]")) openCart();
  if (t.matches("[data-cart-close]")) closeCart();
  if (t.matches("[data-cart-clear]")) { clearCart(); renderCartModal(); }
  if (t.matches("[data-cart-send]")) sendCartOrder();

  if (t.matches("[data-request]")) {
    const title = t.getAttribute("data-title") || "Запчасть";
    const note = t.getAttribute("data-note") || "";
    const text =
Здравствуйте! Нужна позиция: ${title}${note ?  (${note}) : ""}
VIN/авто: (укажите VIN / марку/модель/год/двигатель)
Нужны цена и срок.;
    openTelegramPrefill(text);
  }

  if (t.matches("[data-add]")) {
    const id = t.getAttribute("data-id");
    const title = t.getAttribute("data-title");
    const note = t.getAttribute("data-note") || "";
    if (!id || !title) return;
    addToCart({ id, title, note });
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCart();
});

document.addEventListener("DOMContentLoaded", updateCartBadge);
