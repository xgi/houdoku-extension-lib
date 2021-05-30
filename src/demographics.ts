import { DemographicKey } from "./enums";
import { Demographic } from "./types";

// eslint-disable-next-line import/prefer-default-export
export const Demographics: { [key: string]: Demographic } = {
  [DemographicKey.UNCERTAIN]: {
    key: DemographicKey.UNCERTAIN,
    name: "Uncertain",
  },
  [DemographicKey.JOSEI]: { key: DemographicKey.JOSEI, name: "Josei" },
  [DemographicKey.SEINEN]: { key: DemographicKey.SEINEN, name: "Seinen" },
  [DemographicKey.SHOUJO]: { key: DemographicKey.SHOUJO, name: "Shoujo" },
  [DemographicKey.SHOUNEN]: {
    key: DemographicKey.SHOUNEN,
    name: "Shounen",
  },
};

export const demographicKeysFromNames = (names: string[]) => {
  return names.map((name: string) => {
    const matching: Demographic | undefined = Object.values(Demographics).find(
      (demographic: Demographic) => demographic.name === name
    );
    return matching === undefined ? null : matching.key;
  });
};
