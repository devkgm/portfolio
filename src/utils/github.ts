import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function getReadmeContent(url: string) {
  try {
    // GitHub URL에서 owner와 repo 추출
    const urlParts = url.replace('https://github.com/', '').split('/');
    const owner = urlParts[0];
    const repo = urlParts[1];

    // README.md 내용 가져오기
    const response = await octokit.rest.repos.getReadme({
      owner,
      repo,
      mediaType: {
        format: 'raw',
      },
    });

    return response.data as string;
  } catch (error) {
    console.error('Failed to fetch README:', error);
    return null;
  }
}

export async function getGitHubUser(username: string) {
  try {
    const response = await octokit.rest.users.getByUsername({
      username,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch GitHub user:', error);
    return null;
  }
} 