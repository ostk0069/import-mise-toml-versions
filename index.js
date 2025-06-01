const core = require('@actions/core');
const github = require('@actions/github');
const { promises: fs } = require('fs');

/** .tool-version format
 * {Runtime} {Version}
 *
 * e.g.
 * [tools]
 * node = "22.14.0"
 * flutter = "3.24.5-stable"
 * dart = "3.5.4"
 * java = "temurin-17.0.15+6"
 * gcloud = "517.0.0"
 * fastlane = "2.227.2"
 * cocoapods = "1.16.2"
 *
 * [alias]
 * fastlane = "git@github.com:mollyIV/asdf-fastlane.git"
 */
const main = async () => {
  const path = core.getInput('path');
  const text = await fs.readFile(path, 'utf8');
  const content = text.toString();

  // [tools]セクションを抽出
  const toolsSection = content.match(/\[tools\]([\s\S]*?)(?=\[|$)/);
  if (!toolsSection) {
    throw new Error('No [tools] section found in mise.toml');
  }

  // ツールとバージョンのペアを抽出
  const toolLines = toolsSection[1].trim().split('\n');
  toolLines.forEach(line => {
    const match = line.match(/^\s*(\w+)\s*=\s*"([^"]+)"\s*$/);
    if (match) {
      const [, tool, version] = match;

      // ツール固有のバージョン処理
      let finalVersion = version;
      if (tool === 'flutter') {
        finalVersion = version
          .replace(/-stable$/, '')
          .replace(/\.pre-beta$/, '')
          .replace(/\.pre-dev$/, '');
      } else if (tool === 'java') {
        finalVersion = version.split('-')[1] || version;
      }

      core.setOutput(tool, finalVersion);
      console.log(`${tool} = ${finalVersion}`);
    }
  });
};

main().catch((err) => core.setFailed(err.message));