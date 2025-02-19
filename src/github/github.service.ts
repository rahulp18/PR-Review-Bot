import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  async getPRFiles(owner: string, repo: string, prNumber: number) {
    const { data } = await this.octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber,
    });
    return data?.map((file) => ({ filename: file.filename, path: file.patch }));
  }
  async commentOnPR(
    owner: string,
    repo: string,
    prNumber: number,
    comment: string,
  ) {
    await this.octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: comment,
    });
  }
}
