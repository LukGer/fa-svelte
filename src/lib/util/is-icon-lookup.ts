import type { IconLookup, IconProp } from "@fortawesome/fontawesome-svg-core";

export const isIconLookup = (i: IconProp): i is IconLookup => (i as IconLookup).prefix !== undefined && (i as IconLookup).iconName !== undefined;