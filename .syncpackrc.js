// @ts-check

/** @type {import("syncpack").RcFile} */

const config = {
  lintSemverRanges: true,
  lintVersions: true,
  lintFormatting: false,
  sortFirst: [
    'name',
    'description',
    'version',
    'private',
    'author',
    'license',
    'scripts',
    'main',
    'module',
    'types',
    'files',
    'dependencies',
    'devDependencies',
  ],
  semverGroups: [
    {
      label: 'use exact version numbers in production',
      packages: ['**'],
      dependencyTypes: ['prod'],
      dependencies: ['**'],
      // specifierTypes: ["!latest"],
      range: '',
    },
    {
      label: 'use range in development',
      packages: ['**'],
      dependencyTypes: ['dev'],
      dependencies: ['**'],
      range: '^',
    },
  ],
  versionGroups: [
    // {
    //   label: "don't use latest in production",
    //   // packages: ["**"],
    //   // dependencyTypes: ["prod", "dev"],
    //   dependencies: ["**"],
    //   // specifierTypes: ["latest"],
    //   policy: "sameRange",
    //   // range: "^",
    // },
    // {
    //   // dependencies: ["**"],
    //   specifierTypes: ["latest"],
    //   isBanned: true,
    // },
    {
      dependencies: ['@types/**'],
      dependencyTypes: ['!dev'],
      isBanned: true,
      label: '@types packages should only be under devDependencies',
    },
    {
      label: 'Use workspace protocol when developing local packages',
      dependencies: ['$LOCAL'],
      dependencyTypes: ['dev', 'prod', 'peer'],
      pinVersion: 'workspace:*',
    },
  ],
};

module.exports = config;
