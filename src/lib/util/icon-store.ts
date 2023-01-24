import type {
  IconDefinition,
  IconName,
  IconPack,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";
import { writable } from "svelte/store";

export type IconDefinitions = {
  [prefix: string]: { [name: string]: IconDefinition };
};

export const iconStore = writable<IconDefinitions>({});

export const addIcons = (...icons: IconDefinition[]) => {
  iconStore.update((definitions) => {
    for (const icon of icons) {
      if (!(icon.prefix in definitions)) {
        definitions[icon.prefix] = {};
      }
      definitions[icon.prefix][icon.iconName] = icon;
      for (const alias of icon.icon[2]) {
        if (typeof alias === "string") {
          definitions[icon.prefix][alias] = icon;
        }
      }
    }

    return definitions;
  });
};

export const addIconPacks = (...packs: IconPack[]) => {
  for (const pack of packs) {
    const icons = Object.keys(pack).map((key) => pack[key]);
    addIcons(...icons);
  }
};

export const getIconDefinition = (
  definitions: IconDefinitions,
  prefix: IconPrefix,
  name: IconName,
) => {
  if (prefix in definitions && name in definitions[prefix]) {
    return definitions[prefix][name];
  }
  return null;
};
