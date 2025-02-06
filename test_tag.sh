current_version=$(npm pkg get version | tr -d '"')
echo "Current version: $current_version"

# Initialize current_version and tag_exists
git fetch --tags

# If the version already exists, bump it and check again
while [ -n "$(git tag -l "$current_version")" ]; do
    echo "Tag For Version $current_version already exists. Bumping version."
    npm version patch --no-git-tag-version
    current_version=$(npm pkg get version | tr -d '"')
done

git fetch origin
git reset --hard
  
echo "Next available version is $current_version."