module.exports = async ({ github, context }, tagName) => {
  try {
    const a = await github.rest.git.getRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `refs/tags/${tagName}`,
    });
    console.log(a)
  } catch (err) {
    console.error(`Failed to get a tag: ${tagName}`);
    console.error(err);
  }
};
