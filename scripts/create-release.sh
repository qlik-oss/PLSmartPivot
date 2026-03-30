#!/bin/bash
set -o errexit

GITHUB_ORG="${1}"
GITHUB_REPO="${2}"
PACKAGE_NAME="${3}"
VERSION="${4}"

echo "Creating release for version: ${VERSION}"
echo "Artifact name: ./dist/${PACKAGE_NAME}_${VERSION}.zip"

gh release create "${VERSION}" "./dist/${PACKAGE_NAME}_${VERSION}.zip" \
  --repo "${GITHUB_ORG}/${GITHUB_REPO}" \
  --title "${VERSION}" \
  --notes "Release ${VERSION}"


# Usage
# $ create-release.sh qlik-oss PLSmartPivot qlik-smart-pivot 0.3.1
