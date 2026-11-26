'use client';

import React from 'react';

export type ExtensionPageKey =
  | 'at-a-glance'
  | 'profile'
  | 'thrust-areas'
  | 'krishi-vigyan-kendras'
  | 'atic'
  | 'communication-center'
  | 'publications'
  | 'adhoc-projects'
  | 'regional-centers'
  | 'district-centers';

interface ExtensionSubmenuNavProps {
  activeKey?: ExtensionPageKey;
}

export const ExtensionSubmenuNav: React.FC<ExtensionSubmenuNavProps> = () => {
  return null;
};
