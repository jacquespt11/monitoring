"use client";

import { Switch as HeadlessSwitch } from "@headlessui/react";

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function Switch({ checked, onCheckedChange }: Props) {
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onCheckedChange}
      className={`${
        checked ? "bg-blue-600" : "bg-gray-600"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HeadlessSwitch>
  );
}
