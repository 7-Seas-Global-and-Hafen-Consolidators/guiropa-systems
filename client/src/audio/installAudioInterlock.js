/*
 * GUIROPA RADIO · GLOBAL AUDIO INTERLOCK
 * --------------------------------------
 * Guarantees that only one HTMLAudioElement can play at a time,
 * including detached `new Audio()` instances and mounted <audio> tags.
 *
 * This is intentionally independent from player UI/state so the local
 * archive player, persistent Tunnel player and any future native audio
 * player cannot overlap.
 */

const REGISTRY_KEY = "__guiropaAudioInterlockRegistry";
const INSTALLED_KEY = "__guiropaAudioInterlockInstalled";

export function installGuiropaAudioInterlock() {
  if (typeof window === "undefined" || typeof HTMLMediaElement === "undefined") {
    return;
  }

  if (window[INSTALLED_KEY]) return;
  window[INSTALLED_KEY] = true;

  const registry = window[REGISTRY_KEY] || new Set();
  window[REGISTRY_KEY] = registry;

  const originalPlay = HTMLMediaElement.prototype.play;

  HTMLMediaElement.prototype.play = function guiropaExclusivePlay(...args) {
    if (this instanceof HTMLAudioElement) {
      registry.add(this);

      registry.forEach((other) => {
        if (other === this) return;

        try {
          if (!other.paused) other.pause();
        } catch {
          // Never block the player that is claiming the audio lane.
        }
      });
    }

    return originalPlay.apply(this, args);
  };
}

installGuiropaAudioInterlock();
