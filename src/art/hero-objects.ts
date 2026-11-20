/**
 * Extra lesson-style object pictures for the hero, drawn the way the app's object art is (100-unit frame, a few
 * flat shapes, one darker shade offset to the side away from the light, a pale bar for shine, palette colours only).
 * The app has no pictures for these, so they live here and `Art.tsx` looks in both places.
 */
import { OBJECTS } from './generated'

const trefoil = (cx: number, cy: number, s: number, fill: string, hub: string) =>
  `<g transform="translate(${cx} ${cy}) scale(${s}) translate(-49 -49)">` +
  `<path d="M49 49L33.5 22.15A31 31 0 0 1 64.5 22.15Z" fill="${fill}"/>` +
  `<path d="M49 49L80 49A31 31 0 0 1 64.5 75.85Z" fill="${fill}"/>` +
  `<path d="M49 49L33.5 75.85A31 31 0 0 1 18 49Z" fill="${fill}"/>` +
  `<circle cx="49" cy="49" r="10" fill="${hub}"/><circle cx="49" cy="49" r="6" fill="${fill}"/></g>`

export const HERO_OBJECTS: Record<string, { name: string; svg: string }> = {
  tower: {
    name: 'a cooling tower',
    svg:
      '<circle cx="40" cy="12" r="9" fill="#BAF2FE"/><circle cx="56" cy="9" r="10" fill="#DDF8FE"/><circle cx="68" cy="14" r="8" fill="#BAF2FE"/>' +
      '<path d="M28 90Q44 62 42 40Q40 26 34 16L74 16Q68 26 66 40Q64 62 80 90Z" fill="#B8CDD3"/>' +
      '<path d="M24 90Q40 62 38 40Q36 26 30 16L70 16Q64 26 62 40Q60 62 76 90Z" fill="#D2E4E8"/>' +
      '<path d="M30 16L70 16L68 24L32 24Z" fill="#1CB0F6"/>' +
      '<rect x="31" y="40" width="5" height="22" rx="2.5" fill="#FFFFFF"/>' +
      '<rect x="18" y="86" width="64" height="8" rx="4" fill="#767676"/>',
  },
  geiger: {
    name: 'a Geiger counter',
    svg:
      '<path d="M80 58Q98 58 94 34" fill="none" stroke="#4B4B4B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<rect x="87" y="6" width="13" height="28" rx="6.5" fill="#4B4B4B"/>' +
      '<rect x="24" y="32" width="60" height="56" rx="12" fill="#1899D6"/>' +
      '<rect x="20" y="30" width="60" height="56" rx="12" fill="#1CB0F6"/>' +
      '<rect x="27" y="37" width="46" height="26" rx="7" fill="#4B4B4B"/>' +
      '<rect x="30" y="40" width="40" height="20" rx="4" fill="#BAF2FE"/>' +
      '<path d="M40 56L58 44" fill="none" stroke="#FF4B4B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="40" cy="56" r="3.4" fill="#4B4B4B"/>' +
      '<circle cx="34" cy="75" r="6.5" fill="#4B4B4B"/><circle cx="34" cy="75" r="2.6" fill="#D2E4E8"/>' +
      '<circle cx="54" cy="71" r="2.4" fill="#1899D6"/><circle cx="62" cy="71" r="2.4" fill="#1899D6"/><circle cx="70" cy="71" r="2.4" fill="#1899D6"/>' +
      '<circle cx="54" cy="79" r="2.4" fill="#1899D6"/><circle cx="62" cy="79" r="2.4" fill="#1899D6"/><circle cx="70" cy="79" r="2.4" fill="#1899D6"/>' +
      '<rect x="24" y="68" width="4" height="14" rx="2" fill="#7AE1FE"/>',
  },
  barrel: {
    name: 'a waste barrel',
    svg:
      '<rect x="28" y="20" width="52" height="70" rx="11" fill="#46A302"/>' +
      '<rect x="24" y="18" width="52" height="70" rx="11" fill="#58CC02"/>' +
      '<rect x="24" y="30" width="52" height="5" fill="#46A302"/><rect x="24" y="72" width="52" height="5" fill="#46A302"/>' +
      '<rect x="26" y="12" width="48" height="12" rx="6" fill="#A5ED6E"/>' +
      trefoil(50, 53, 0.46, '#FFC800', '#58CC02') +
      '<rect x="29" y="40" width="4" height="24" rx="2" fill="#A5ED6E"/>',
  },
  ore: {
    name: 'uranium ore',
    svg:
      OBJECTS.rock!.svg +
      '<path d="M44 36L52 31L60 36L60 46L52 51L44 46Z" fill="#46A302"/><path d="M42 34L50 29L58 34L58 44L50 49L42 44Z" fill="#58CC02"/>' +
      '<path d="M62 56L68 52L74 56L74 64L68 68L62 64Z" fill="#58CC02"/><path d="M62 56L68 52L74 56L68 60Z" fill="#A5ED6E"/>' +
      '<path d="M30 58L35 55L40 58L40 64L35 67L30 64Z" fill="#A5ED6E"/>' +
      '<rect x="46" y="34" width="3" height="8" rx="1.5" fill="#A5ED6E"/>',
  },
}
