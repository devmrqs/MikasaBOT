const ADMINISTRATOR = 0x8;

export function isGuildAdmin(permissions: string | number): boolean {
  return (Number(permissions) & ADMINISTRATOR) === ADMINISTRATOR;
}
