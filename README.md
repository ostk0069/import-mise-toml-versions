# import-mise-toml-versions
🔨 Import .mise.toml tool versions to GitHub Actions workflows.  
mise version of [wasabeef/import-asdf-tool-versions-action](https://github.com/wasabeef/import-asdf-tool-versions-action)

## Usage
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ostk0069/import-mise-toml-versions@v1
        id: mise
        # with:
        #   path: .mise.toml # Default
      - name: Echo mise
        run: |
          echo "${{ steps.mise.outputs.flutter }}"
          echo "${{ steps.mise.outputs.dart }}"
          echo "${{ steps.mise.outputs.nodejs }}"
          echo "${{ steps.mise.outputs.gradle }}"
          echo "${{ steps.mise.outputs.java }}"
          echo "${{ steps.mise.outputs.kotlin }}"
```

### Samples
Use with `subosito/flutter-action`
```yaml
- uses: ostk0069/import-mise-toml-versions@v1
  id: mise
- uses: subosito/flutter-action@v2
  with:
    channel: stable
    flutter-version: ${{ steps.mise.outputs.flutter }}
    cache: true
```