export function createReleaseConfig({
  commitAnalyzer = {},
  releaseNotes = {},
  npm = {},
  prepareCmd,
  gitAssets = ['package.json', 'package-lock.json'],
  github = {},
} = {}) {
  const { writerOpts, ...notesOptions } = releaseNotes

  return {
    plugins: [
      ['@semantic-release/commit-analyzer', commitAnalyzer],
      [
        '@semantic-release/release-notes-generator',
        { ...notesOptions, writerOpts: { headerPartial: () => '', ...writerOpts } },
      ],
      ...(npm === false ? [] : [['@semantic-release/npm', npm]]),
      ...(prepareCmd ? [['@semantic-release/exec', { prepareCmd }]] : []),
      ...(gitAssets === false
        ? []
        : [
            [
              '@semantic-release/git',
              { assets: gitAssets, message: `chore(release): \${nextRelease.version}` },
            ],
          ]),
      [
        '@semantic-release/github',
        {
          failCommentCondition: false,
          successCommentCondition: false,
          releasedLabels: false,
          ...github,
        },
      ],
    ],
  }
}

export default createReleaseConfig()
