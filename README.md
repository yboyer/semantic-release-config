# Shared semantic-release configuration

Install this package and semantic-release 26 in the repository that runs the release.

```sh
npm install --save-dev @yboyer/semantic-release-config semantic-release@26.0.1
```

Use the default configuration in `release.config.mjs`.

```js
export default {
  extends: '@yboyer/semantic-release-config',
}
```

The default workflow analyzes commits, generates release notes without a version
heading, publishes to npm, commits the package manifests, and creates a GitHub release.

Use the factory for project-specific plugin options.

```js
import { createReleaseConfig } from '@yboyer/semantic-release-config'

export default createReleaseConfig({
  npm: { npmPublish: false },
  prepareCmd: `node scripts/release.mjs \${nextRelease.version} && npm run pack`,
  gitAssets: ['package.json', 'package-lock.json', 'Info.json'],
  github: { assets: ['dist/alldebrid.iinaplgz'] },
})
```

Install `@semantic-release/exec` in the consuming project when using
`prepareCmd`. Set `npm` or `gitAssets` to `false` to omit that plugin.
The `commitAnalyzer` and `releaseNotes` options are passed to their corresponding plugins.
