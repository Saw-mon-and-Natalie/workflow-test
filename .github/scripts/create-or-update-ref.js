module.exports = async ({ github, context }, tagName) => {
  try {
    await github.rest.getRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `tags/${tagName}`,
    });

    await github.rest.git.updateRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `tags/${tagName}`,
      sha: context.sha,
      force: true,
    });
  } catch (err) {
    console.log(`⛔ tag: ${tagName} doesn't exist. Creating the tag`);
    console.log(err)
    try {
      await github.rest.git.createRef({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ref: `refs/tags/${tagName}`,
        sha: context.sha,
        force: true,
      });
    } catch (err) {
      console.error(`Failed to create tag: ${tagName}`);
      console.error(err);
    }
  }
};
