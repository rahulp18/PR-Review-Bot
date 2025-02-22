export declare class GithubService {
    private octokit;
    getPRFiles(owner: string, repo: string, prNumber: number): Promise<{
        filename: string;
        path: string | undefined;
    }[]>;
    commentOnPR(owner: string, repo: string, prNumber: number, comment: string): Promise<void>;
}
