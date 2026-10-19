/** Keep the painted room's tube attached despite its independent cover crop. */
export function updateWardInfusionTube(root: ParentNode) {
  const background = root.querySelector<HTMLImageElement>(".story-backdrop");
  if (!background?.naturalWidth) return;
  const room = background.getBoundingClientRect();
  const scale = Math.max(
    room.width / background.naturalWidth,
    room.height / background.naturalHeight,
  );
  const width = background.naturalWidth * scale;
  const height = background.naturalHeight * scale;
  // Blend along the last painted section, following its outgoing tangent.
  const sourceX = room.left + (room.width - width) / 2 + width * (320 / 1600);
  const sourceY = room.top + (room.height - height) / 2 + height * (836 / 900);

  root.querySelectorAll<SVGSVGElement>("[data-ward-tube]").forEach((tube) => {
    const name = tube.dataset.wardTube!;
    const patient = root.querySelector<HTMLImageElement>(`[data-ward="${name}"]`);
    if (!patient) return;
    const bounds = tube.getBoundingClientRect();
    const person = patient.getBoundingClientRect();
    // The first layer includes the cannula; the changed layer ends at the arm.
    const hand = name === "original-2" ? [0.035, 0.901] : [0.175, 0.998];
    const sx = sourceX - bounds.left;
    const sy = sourceY - bounds.top;
    const tx = person.left + person.width * hand[0] - bounds.left;
    const ty = person.top + person.height * hand[1] - bounds.top;
    const bend = Math.max(width * 0.012, Math.abs(tx - sx) * 0.35);
    const line = width * (14 / 1600);
    const pixel = width / 1600;
    const joinX = sx + 32 * pixel;
    const joinY = sy + 6 * pixel;
    const path = `M ${sx} ${sy} C ${sx + 10 * pixel} ${sy + 3 * pixel}, ${sx + 20 * pixel} ${sy + 5 * pixel}, ${joinX} ${joinY} C ${joinX + bend} ${joinY + bend / 12}, ${tx - bend} ${ty}, ${tx} ${ty}`;
    tube.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
    tube.querySelectorAll("path").forEach((stroke) => stroke.setAttribute("d", path));
    const blend = tube.querySelector("linearGradient");
    blend?.setAttribute("x1", String(sx));
    blend?.setAttribute("y1", String(sy));
    blend?.setAttribute("x2", String(joinX));
    blend?.setAttribute("y2", String(joinY));
    tube.style.setProperty("--tube-width", String(line));
  });
}
