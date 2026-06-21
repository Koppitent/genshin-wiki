"use client";

import RegionBlock from "./RegionBlock";
import WeaponBlock from "./WeaponBlock";

export default function Page() {
  return (
    <div className="flex m-5 gap-10">
      <WeaponBlock />
			<RegionBlock />
    </div>
  );
}
