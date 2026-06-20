"use client";

import { WeaponType } from "../../generated/prisma/client";
import ParameterBlock from "./ParameterBlock";
import RegionBlock from "./RegionBlock";

export default function Page() {
  return (
    <div className="flex m-5 gap-10">
      <ParameterBlock<WeaponType>
        endpoint="weaponType"
        title="Waffenarten"
      />
			<RegionBlock />
    </div>
  );
}
